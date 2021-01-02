# Postitt Setup

This is an example of how to set up the dev environment to work on Postitt.

## Setting up environment variables:

At the moment, there is one `.env` file in the Back-End repository for the server, a list of them is below.

| Syntax     | Value                   |
| ---------- | ----------------------- |
| PORT       | 5000                    |
| NODE_ENV   | development             |
| APP_URL    | `http://localhost:5000` |
| JWT_SECRET | "secret"                |
| ORIGIN     | `http://localhost:3000` |

---

## Connecting the server to your local Postgres instance:

In `Back-End/ormconfig.json` make sure you have the correct port, database, username and password for TypeORM to connect to Postgres.

---

## Starting the server and client

Clone both repositories into any folder so they are like this:

```bash
Postitt-io
│
└──>Front-End
│
└──>Back-End

```

---

### _For the following commands, make sure your current directory is:_

`$~\Postitt-io\Back-End`

---

Run the migration on the database to set up the tables correctly:

```bash
npm run typeorm migration:run
```

If you'd like some sample data to work with, you can seed the database with:

```bash
npm run seed
```

Then you can run the below command. This will start both the client and the server at the same time.

```bash
npm run dev
```

### Access the dev site at `localhost:3000`

---

## Happy coding!
