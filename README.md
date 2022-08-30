# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To get started, you can run:

### `cd client && npm run prepare`
Setup the git hooks (we use [Husky](https://www.npmjs.com/package/husky))

### Insert 2 users to local database

- Run `npm run seeder:up` to insert populate user table
- Run `npm run seeder:down` to delete user table

### `cd client && npm run build`

Builds the client app for production to the `build` folder.\

### `cd server && npm run build`

Builds the server app for production to the `build` folder.\

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.