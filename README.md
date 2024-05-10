# Wango Parking Test Full Stack Application

// TODO: add links here
// TODO: change ports

## This stack includes:
### Backend:  
    Node.js - v22
    NPM  - v10
    Typescript v5
    Express.js - v4
    PostgreSql
    Nodemon
    Swagger
    Biome.js (linting and formatting) // IMPORTANT! if you have Prettier-Eslint in your editor you might have some linting errors
    Winston.js + Morgan (Logging)
    Docker, Docker Compose, NGINX and Certbot

### Frontend:
    Node.js - v22
    NPM  - v10
    Vite
    Solid.js

## Why this tech stack?
First of all, Node + Express was part of the requirements, so i went with that. 

Now, DB, i went with PostgreSql, because it's a solid choice among SQL databases. 
I did not go with MongoDB, even though that's where my most expertise lies.
Mongo allows too many rookie mistakes when it comes to database schemas and relationships.
Besides that, you are locked to 2 DB GUI's pretty much, one premium Studio3t and free Compass.
And not to mention licensing SSPL v1.0 which leaves you only 3 options when it comes to deployment.
Self hosting (time consuming), AWS DocumentDB (behind in features) or Atlas Cloud (too expensive). 
So, i chose PostgreSql.

I chose TypeORM as my ORM of choice, as it is solid option, well supported, documented and has reach features AND integrates well with Typescript.

And lastly server architecture, it's not fully OOP, not fully FP and not fully MVC. Something in the middle.
I decided not to abstract too much as it's time consuming and can be hard for Juniors to get into.
I think this a great fundamental architecture for me as i can build a lot of features on top.


## Frontend stack

#### Why Solid instead of React?

Well, i decided to use this assignment as an opportunity to learn something new.
So i chose the stack that I would be happy with, not what was or would be in requirements.
I think Solid is a "solid" pun intended choice of frontend framework.
First of all it's new, which means it doesn't have a legacy of Class components.
And it's built on top of JSX which means Dev transition from React is easy.
And lastly it's faster than React in all of the benchmarks.

I didn't add any state management library, because i thought included state management would suffice.

## How to run it?

### With NPM
 - navigate to frontend directory and run `npm install`
 - Create an .env file and add `API_URL=http://localhost:3000`
 - run `npm run dev`
 - Download, install and set up [PosgreSQL](https://www.postgresql.org/download/). Once you setup db, add user and password to server `.env` file
 - open another terminal and navigate to `server` directory
 - run `npm install`
 - create an `.env` file in this directory and populate with variables from `.env.example`
 - run `npm run dev`

### With Docker compose
- Create .env file in the root directory, from .env.example file
- run `docker compose build` in root directory of the project.
- run `docker compose up -d` in root dir.





