export const bmiCalculator = (args : string[]) : string => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    let height = Number(args[2])
    let weight = Number(args[3])

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Give a number as an argument.')
    }

    if (height === 0 || weight === 0) {
        throw new Error('Division by zero is impossible.')
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

try {
    console.log(bmiCalculator(process.argv));
  } catch (error) {
    console.log('Something went wrong: ' + error.message);
}