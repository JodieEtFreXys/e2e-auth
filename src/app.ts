import dotenv from "dotenv"
import express, { Express } from "express"
import mainRouter from "./http/router/main.route"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '2kb' }));
app.use(express.text());
app.use(express.urlencoded({ extended: true, limit: '2kb' }));

app.use('/api', mainRouter);

app.listen(port, async () => {
    console.log(`App is running in port: `, port);
})