Feature: Querying for keywords
	As an end user
	I want to get all keywords in the database
	So that I can use that data

	Scenario: The web server should work
		Given a non-empty database and a running server
		When I make a get request to /api/keywords/
		Then it should respond with 'expected'