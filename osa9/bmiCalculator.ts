export const bmiCalculator = (height: number, weight: number) : string => {
    if (height === 0 || weight === 0) {
        throw new Error('Division by zero is impossible.')
    }

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Give a number as an argument.')
    }

    height = height / 100;

    const bmi = weight / (height * height);

    if (bmi < 18.5) {
        return 'underweight';
    }
    if (bmi > 18.5 && bmi < 24.9) {
        return 'normal weight';
    }
    if (bmi > 25 && bmi > 29.9) {
        return 'overweight';
    }

    return 'obese';
}

/*
try {
    console.log(bmiCalculator(180, 74));
  } catch (error) {
    console.log('Something went wrong: ' + error.message);
}
*/