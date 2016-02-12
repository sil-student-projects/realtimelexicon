Feature: Post requests
	As an end user
	I want to be able to add and edit database entries
	So that I can manage the database contents

	Scenario: The web server api should respond to post requests for creating
		Given a running server with 'preload' values in database
		When I make a post request to /api/keywords/
		Then the server should create a new database entry

	Scenario: The Web server should respond to post requests for updating
		Given a running server with 'preload' values in database
		When I make a post request to /api/keywords/:id/
		Then the server should update the database entry that has a matching _id