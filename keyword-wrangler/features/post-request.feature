Feature: Creating new database entries
	As an end user
	I want to be able to add new database entries
	So that the app actually does something

	Scenario: The web server api should respond to post requests
		Given a running server
		When I make a post request to /api/keywords/
		Then the server should create a new database entry