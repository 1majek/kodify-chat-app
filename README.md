### Get started

To get started, make sure you create a database on you local machine called `kodify-chat`.
Then initialize the database base with the following command.
(All commands should start from the root directory)

- Run `cd server && npm run db-migrate:up`

### Insert 2 users to local database (inside the server directory)
- Run `npm run seeder:up` to populate user table
- Run `npm run seeder:down` to truncate user table

### `cd client && npm run prepare`
Setup the git hooks (we use [Husky](https://www.npmjs.com/package/husky))

### `cd client && npm run build`

Builds the client app for production to the `build` folder.\

### `cd server && npm run build`

Builds the server app for production to the `build` folder.\

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### USERS AND PASSWORDS TO LOGIN
Steven
- email: majek1@hotmail.com
- password: steven

Kody
-email: kody@hotmail.com
-password: kody