import dotenv from "dotenv"
import express, { Express } from "express"
import mainRouter from "./http/router/auth.router"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8001;

app.use(express.json({ limit: '2kb' }));
app.use(express.text());
app.use(express.urlencoded({ extended: true, limit: '2kb' }));

app.use('/api', mainRouter);

app.listen(8001, async () => {
    console.log(`App is running in port: `, 8001);
})