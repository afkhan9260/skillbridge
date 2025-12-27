import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());

// api routes
app.get('/', (req, res) => {
  res.send('SkillBridge backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});