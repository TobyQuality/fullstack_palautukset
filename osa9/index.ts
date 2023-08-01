import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const {weight, height} = req.query;

    if (weight === undefined || height === undefined) {
        res.send({error: "empty arguments"});
    }

    try {
        const bmiReport = bmiCalculator(Number(height), Number(weight));
        res.send({
            weight: weight, height: height, bmi: bmiReport
        });
    } catch(error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        res.send({error: error.message});
    }

});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let {daily_exercises, target} = req.body;
    target = Number(target);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    daily_exercises = daily_exercises.map((de: any) => Number(de));
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        res.send(calculateExercises(daily_exercises, target));
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});