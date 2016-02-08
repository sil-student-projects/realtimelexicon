Feature: Student can start senior project
	As a student
	I want to the server to work
	So that I can deliver a senior product

	Scenario: The web server should work
		Given a non-empty database
		When I make a get request to /api/keywords/
		Then it should respond with 'expected'