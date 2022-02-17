This is the front end for the OnlyGraph (Group 14) TTDS Project

# Requirements

- A recent Version of Node and npm

# Installation

- Clone the repo
- Enter the directory
- Run `npm install`
- Add a .env.local file and add the variable `NEXT_PUBLIC_BACKEND` which points to the location of the search API (e.g. `NEXT_PUBLIC_BACKEND=http://localhost:8000`)

# Usage

For a development environment run `npm run dev` and it'll start the web server

For production either run the production server `npm start` or for the static pages run `npm run build` and they will be produced in a new directory called 'out'
