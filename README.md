Lab 20: Back-end Deployment 

**Author:** Jennifer Piper

This is a demonstration of deployment of a simple REST API to Heroku using GitHub, Travis, and MongoDB.


## Getting Started
In a node.js environment, from the root of this repo, install dependencies:
* `npm i`

Start the database server: 
* `npm run dbon`

Run tests (this starts the Node server before the tests, and stops it after the tests):
* `npm run test`

To turn off the database server: 
* `npm run dboff`

To build transpiled files and start the local Node server:
* `npm start`

To test the local server, make a POST request to /signup with dummy data: 

* `echo '{"username":"foo","password":"bar","email":"baz@baz.com"}' | http POST http://localhost:3000/signup`

If the username is unique, the server will return a 200 status code and an authorization token. If this username has been used before, it will return a 409 code.

* To test the deployed app, make a POST request to /signup with dummy data:

`echo '{"username":"foo","password":"bar","email":"baz@baz.com"}' | http POST http://lab-20-jennifer.herokuapp.com/signup`

Again, if the username is unique, the server will return a 200 status code and an authorization token. If this username has been used before, it will return a 409 code.
