# GitHub API Integration Web App

This is a full-stack web application that
integrates with the GitHub API to provide
a seamless browsing experience for users.
The application is built using Express.js
as the backend and Axios as the HTTP client
to interact with the GitHub API.

## Features

 - __User Search:__ Allows users to search for
GitHub users using the GitHub API
and retrieve relevant user information.

 - __User Details:__ Displays user details including username,
profile picture, bio, and some of their repositories.

 - __ Repository Details:__ Provides detailed information
about a selected repository, such as the last commit date,
creation date, description, and the last 5 commit descriptions.

## Technologies Used

 - __Express.js:__ A popular Node.js framework
for building server-side applications.

 - __Axios:__ A widely used HTTP client for
making API requests in Node.js.

 - __GitHub API:__ A free and open API provided by GitHub
that allows developers to interact with GitHub repositories,
users, and other resources.

## Installation

 1. Clone the repository to your local machine.
 2. Navigate to the project directory.
 3. Install the dependencies using npm install command.
 4. Create a .env file in the project root directory
    and set the following environment variables:

         PORT=3000  # or any other desired port number

 5. Start the application using npm start command.

## Usage

 - Open a web browser and go to http://localhost:3000
   (or the desired port number set in .env file).

 - Use the search box to search for GitHub users.

 -  Click on a user to view their details and repositories.

 -  Click on a repository to view its details.

## Contributing

If you would like to contribute to this project,
feel free to submit a pull request or open an issue
for any suggestions or bug reports.

## License

This project is licensed under the GPLv3 License.
Feel free to use and modify it as per your requirements.

## Credits

This project was created by Frankie Chow.
Special thanks to the GitHub API for
providing the free and open API for integration.
