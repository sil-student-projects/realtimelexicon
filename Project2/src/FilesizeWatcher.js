'use strict';

var fs = require('fs'); //to use stat to constantly watch through the file

var FilesizeWatcher = function(path)
{
    var self = this; //instance var
    
    self.callbacks = {}; //callback object
    
    if (/^\//.test(path) === false)
    {
        process.nextTick(function() //wait for the event handler been attached, then call the callback function
        {
            self.callbacks['error']('Path does not start with a slash'); //callback
        });
        return;
    }
    
    fs.stat(path, function(err, stats)
    {
        self.lastfilesize = stats.size;
    }); //scan through the file, figure out the file size
    
    self.interval = setInterval(function()
    {
        fs.stat(path, function(err, stats) //go through the file at location path
        {
            if (stats.size > self.lastfilesize) //compaire the size
            {
                self.callbacks['grew'](stats.size - self.lastfilesize);
                //self.callbacks['grew'] returns the callback function paired with grew, then call it with the size difference as the parameter
                self.lastfilesize = stats.size; 
            }
            if (stats.size < self.lastfilesize)
            {
                self.callbacks['shrank'](self.lastfilesize - stats.size);
                self.lastfilesize = stats.size;
            }
        }, 1000); //set interval
    });
};

FilesizeWatcher.prototype.on = function(eventType, callback) //the event handler
{
    this.callbacks[eventType] = callback; 
    //the only thing handler do is too add the event and callback function pair to the self.callbacks object
};

FilesizeWatcher.prototype.stop = function()
{
    clearInterval(this.interval); //stop the interval
};

module.exports = FilesizeWatcher;