
import { db } from "./utils/db";
import app from "./app";

const PORT = process.env.PORT || 3001;

db.$connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`REST API server ready at: http://localhost:${PORT}`);
        });
    })
    .catch((error) => { console.log({ error }) })
