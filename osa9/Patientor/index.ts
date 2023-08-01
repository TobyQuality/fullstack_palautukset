import express from 'express';
import cors from 'cors';
import diagnosisRouter  from './frontend/src/routes/diagnoses';
import patientRouter  from './frontend/src/routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});