#RealTimeLexicon GitHub.#

In order to run the demo app do the following:

* "npm install" in the root directory

* "sudo npm install --global gulp", manual install gulp globally if gulp is not found

* Install mongodb, see [mongo site](https://docs.mongodb.org/manual/installation/)

* "mkdir -p ./data/db" and "mongod -dbpath ./data/db", make a directory to put data

* "use mydb" in the mongo shell to create the mydb database

* Run "gulp server" in the root directory to start the server

* Go to localhost:7777 in a browser

###Explaination###

The server is written in such a way right now that it will only work if a mongod server is running on default port on the same machine. That mongod server must have a database called "mydb" in it because the app's server will attempt to connect to that db and wrap it.

The "gulp server" command must be used in the terminal to start the server. This is because the "server" task that is defined in gulpfile.js runs some important tasks before starting up the server. Those tasks will browserify, reactify, and pipe the app's crucial files into a .tmp directory so that the view has access to them. (The server exposes the .tmp directory to the view.)

The files that are important for raw functionality are

* server/server.js
* app/main.jsx
* app/index.ejs
* components/* (all of the files in the components directory)

Look in the above files for the code that builds the app
