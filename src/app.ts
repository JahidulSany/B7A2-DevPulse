import express, {
  urlencoded,
  type Application,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

// Root Route
app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<h1>Welcome to Devpulse, an internal Tech Issue & Feature Tracker</h1>',
    );
});



export default app;
