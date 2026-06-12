import cors from 'cors';
import express, {
  urlencoded,
  type Application,
  type Request,
  type Response,
} from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { authRoute } from './modules/auth/auth.route';
import { issueRoute } from './modules/issues/issue.route';

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

// Auth Route
app.use('/api/auth', authRoute);

// Issue Route
app.use('/api/issues', issueRoute);

// Global Error Handler Middleware

app.use(globalErrorHandler);

export default app;
