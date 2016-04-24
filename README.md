###RealTimeLexicon GitHub.###

In order to run the demo app do the following:

1. "npm install" in the root directory

2. "sudo npm install --global gulp", manual install gulp globally if gulp not found

3. Install mongodb, see https://docs.mongodb.org/manual/installation/

4. "mkdir -p ./data/db" and "morgod -dbpath ./data/db", make a directory to put data

4. "use mydb" in the mongo shell to create the mydb database

5. Run "gulp server" in the root directory to start the server

6. Go to localhost:7777 in a browser
