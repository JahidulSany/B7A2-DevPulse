import express, { urlencoded, type Application } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.get('/', (req, res) => {
  res.send(
    '<h1>Welcome to Devpulse, an internal Tech Issue & Feature Tracker</h1>',
  );
});

export default app;
