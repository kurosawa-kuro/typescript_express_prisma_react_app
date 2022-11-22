import express from "express";
import logger from "morgan";
import usersRoute from './routes/usersRoute';
import authRoute from './routes/authRoute';
import { notFound, errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("hello express\n");
});

app.use('/auth', authRoute);
app.use('/users', usersRoute);

app.use(notFound);
app.use(errorHandler);

export default app;