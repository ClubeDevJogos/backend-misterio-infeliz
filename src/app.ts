import express from "express";
import cors from "cors";
import routes from "./routes";
import { jsonSyntaxError } from "./helpers/error";
import "./database/syncDatabase";

const app = express();

app.use(cors());
app.use(express.json());
app.use(jsonSyntaxError);

app.use(routes);

export default app;
