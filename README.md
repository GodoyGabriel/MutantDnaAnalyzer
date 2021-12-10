# X-Men Api - Mutant DNA Analyzer
API in Heroku = https://mutant-dna-anayzer.herokuapp.com

Valid endpoints
#### [/mutant](https://mutant-dna-anayzer.herokuapp.com/mutant)
* Method: POST 
* Objective: Validate the matrix entered by body, which if it is valid will proceed to insert it into the Database. If it is Mutant, it will return HTTP 200-OK, otherwise 403-Forbidden.
* Premises: The matrix entered by body will have to be square. The letters of the Strings can only be (A, T, C, G) which represents each nitrogenous base of DNA. It is mutant, if more than one sequence of four equal letters is found, obliquely, horizontally or vertically.
* Input Body Example:
{ "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }

#### [/stats](https://mutant-dna-anayzer.herokuapp.com/stats)
* Method: GET
* Objective: To return the number of humans and the number of mutants, as well as the ratio between these numbers.
* Exit Body Example: { "count_mutant_dna":40, "count_human_dna":100, "ratio":0.4}
### Local Tests
* Database: The database is deployed at cloud.mongodb.com, check for environment variables.
* Start API: Execute the command "npm install" in its directory to be able to install all the dependencies of the project, then execute "npm start" to start it.
* Tests: Execute the command "npm test" or "mocha" to start the tests.
