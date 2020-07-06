# SpringBoot-MongoDB-React

<h3>Requirements:</h4>

MongoDB started, SpringBoot application launched to publish the REST API and UI Application (previously npm install in both applications) should be launch with "npm start" for React App and "npm run server" for Vue App.

<h3>List of Endpoints:</h3>

<b>Create Book Rest API - Post HTTP Request:</b>

- http://localhost:8080/api/v1/books

{
"name" : "Warbreaker",
"orderCollection" : 1,
"collection" : "Warbreaker series"
}

<b>Update Book Rest API - PUT HTTP Request:</b>

- http://localhost:8080/api/v1/books/4

{
"name" : "Warbreaker",
"orderCollection" : 1,
"collection" : "Warbreaker FANCY series"
}

<b>Delete Book Rest API - Delete HTTP Request:</b>

- http://localhost:8080/api/v1/books/4

<b>Get Book Rest API - Get HTTP Request:</b>

- http://localhost:8080/api/v1/books/4

<b>Get All Books Rest API - Get HTTP Request:</b>

- http://localhost:8080/api/v1/books
