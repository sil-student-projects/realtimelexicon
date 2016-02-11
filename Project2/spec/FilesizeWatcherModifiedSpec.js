'use strict';

//A FilesizeWatcher class can be instantiated with a file path and returns an event emitter
var FilesizeWatcher = require('../src/FilesizeWatcher');

var exec = require('child_process').exec; //munipulate our test file as sh within specifiction
//child_process is a module, which can use the exec function

describe('FilesizeWatcher', function()
{
    var watcher;

    afterEach(function() //stop the watch
    {
        watcher.stop();
    });

    it('should fire a "grew" event when the file grew in size', function(done)
    {
        var path = '/var/tmp/filesizewatcher.test';
        exec('rm -f ' + path + ' ; touch ' + path, function()
        {
            watcher = new FilesizeWatcher(path);
            
            watcher.on('grew', function(gain) //when grew event occurs, do this callback
            {
                expect(gain).toBe(5);
                done(); //since we use synchronous operations, Jasmine needs to know when events are fired by triggering the callbcaks 
            });

            exec('echo "test" > ' + path, function() {}); //display the path
        });

    });

    it('should fire a "shrank" event when the file grew in size', function(done)
    {
        var path = '/var/tmp/filesizewatcher.test';
        exec('rm -f ' + path + ' ; echo "test" > ' + path, function()
        {
            watcher = new FilesizeWatcher(path);
            watcher.on('shrank', function(loss)
            {
                expect(loss).toBe(3);
                done();
            });

            exec('echo "a" > ' + path, function() {});
        });
    });

    it('should fire "error" if path does not start with a slash', function(done)
    {
        var path = 'var/tmp/filesizewatcher.test';
        watcher = new FilesizeWatcher(path);

        watcher.on('error', function(err)
        {
            expect(err).toBe('Path does not start with a slash');
            done();
        });
    });

});