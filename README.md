# e-commerce

This is a simple REST api application for an e-commerce web application "SHOPMATE.

## Tech Stack

The following are are the tools that make up the tech stack used in building this application.

- **Programming Language**: JavaScript
- **API Framework**: Express
- **Runtime Engine**: NodeJs
- **Database**: MySQL
- **Scripting Language**: Bash
- **Documentation**: Swagger
- **Testing Framework**: Jest

## Other tools

- **Loggly**: This tool helps log all info and error that occur on the production server.

## Coding style

All code is written in using the latest JavaScript features and transpile to CommonJS using babel 7. This gives room for the use of es6 classes and import statements in the codebase. The AirBnB style guide was adopted for this project and ESlint has been configured to enforce linting. Prettier has also been setup to aid code formating. Linting and formatting is run automatically before each commit by a pre commit hook that had been added to the `.git/hooks` file.

## Setup

To setup this project on your machine, ensure that you have the `.env.sample` file in the root directory. This file will be used in generating a `.env` file which will house all your environment variables.

Run `npm run setup` on your terminal.

That should install all dependencies and generate the `.env` file. Go ahead and provide actual values for all the environment variables.

Create a [loggly](https://iyikuyoro.loggly.com) account and accrue the necessary keys.
Create a google developer account and accrue credentials for a new product to enable social auth. kep in mind that you will need to also setup your call back URLs on google. All callback urls should point to the frontend.

## Starting the application

There are two environments you can run your app in locally. This are in development mode and in production mode.

### Development Mode

In this mode, your app is listening for changes made to the codebase and new changes are transpiled on the fly and served immediately. Also, error messages are logged to the console in this mode so You can have quick access to what is going on on the server.

To start the server in development mode, run `npm run dev` on your terminal.

### Production Mode

In production mode, the application is run like it would on the server against a production database that has been pre set in the `.env` file. In this mode, the application does not watch for changes and restart. Errors are also not logged to the console. rather they are logged to your loggy dashboard for viewing.

To start the server in production, you would have to build the production ready code first. Run `npm run build` to do this. Then run `npm start` to start the server in production mode.

## Codebase Structure

### Root

The configuration files for some of the tools are hosted here, along with the started files for the project.

- **Docs**: All swagger doc files are held in this folder.
- **integrationTests**: Integration tests written with supertest are held in this folder
- **bin**: This contains files that are used to run the application in the required environment
- **.vscode**: This are editor specific files that provide some editor needed settings
- **scripts**: All bash scripts are held in this folder.

### src

This folder contains the applications logic. With sub-folders for critical components in the application.

- **configs**: This holds configuration files for the application.
- **Controllers**: This holds all business logic for the actual functionalities that have been implemented int the application.
- **middlewares**: This holds validations for most of the endpoints available in the application.
- **router**: This holds the application request routing files
- **services**: Here lies all requests made to the database to access or modify data
- **helpers**: For some functions that are used in more that one location, files have been seperated here to handle these
