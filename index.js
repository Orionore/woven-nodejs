import express from 'express';
import dotenv from 'dotenv';
import adminRouter from './routes/admin.routes.js';
import storyRouter from './routes/story.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js'

const app = express();
const port = 3000

dotenv.config();

app.use(express.json());

app.use('/user', userRouter);
app.use('/story', storyRouter);
app.use('/', authRouter);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});