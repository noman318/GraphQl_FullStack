import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import Colors from "colors";
import connectToDb from "./config/db.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

connectToDb();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(
  ("/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  }))
);

app.listen(PORT, console.log(`Listening on PORT ${PORT}`.cyan.underline));
