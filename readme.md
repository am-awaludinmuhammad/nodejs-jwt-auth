# Node JS - MySQL Authentication System using JWT

## Description
The main purpose of this repository is to learn how to make an authentication system in Node JS using Json Web Token.
For the database, I use MySQL Database and [Prisma ORM](https://www.prisma.io/docs/getting-started).

## Main Features
- Register
- Login
- Get current user data
- Refresh access token
- Logout

## Environment Variables
This project uses the following environment variables:

- DATABASE_URL
- ACCESS_TOKEN_SECRET
- REFRESH_TOKEN_SECRET
- ACCESS_TOKEN_LIFE
- REFRESH_TOKEN_LIFE

## Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
```

## Migrate Database
In this project, I use MySQL database and Prisma ORM.

- Migrate database
  ```
  npx prisma migrate dev
  ```

## API Docs
The documentation is located inside the "docs" directory.