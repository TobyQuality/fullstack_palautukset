export interface exerciseInfo {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

export const calculateExercises = (daily_exercises: number[], target: number ): exerciseInfo => {
    if (daily_exercises.length < 7 || target === undefined) {
        throw new Error('parameters missing');
    }

    if (isNaN(target)) {
        throw new Error(
            'malformatted parameters'
        );
    }
    for (let i = 0; i < daily_exercises.length; i++) {
            if (isNaN(daily_exercises[i])) {
                throw new Error(
                    'malformatted parameters'
                );
            }
        }

    let trainingDays = 0;
    daily_exercises.map(a => {
        if (a !== 0) {
            trainingDays += 1;
        }
    });

    let average = 0;
    daily_exercises.map(a => {
        average += a;
    });
    average = average / trainingDays;

    let rating = 1;
    if (average > 2 && average < 3) {
        rating = 2;
    }
    if (average > 3) {
        rating = 3;
    }

    const ratingDescriptions = [
        'Below average',
        'Average',
        'Above average'
    ];
    let ratingDescription = ratingDescriptions[0];
    if (rating == 2) {
        ratingDescription = ratingDescriptions[1];
    }
    if (rating == 3) {
        ratingDescription = ratingDescriptions[2];
    }
    
    let success = false;
    if (rating >= target) {
        success = true;
    } 

    return {
        periodLength: daily_exercises.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };

};

const calculateExercisesConsole = (args: string[]): exerciseInfo => {
    if (args.length < 9) throw new Error('Not enough arguments');

    const numberArguments = [];
    for (let i = 0; i < args.length; i++) {
         if (i === 0 || i === 1) {
            continue;
        } else {
            if (isNaN(Number(args[i]))) {
                throw new Error('Provided values were not numbers');
            }
            numberArguments.push(Number(args[i]));
        }
    }

    let trainingDays = 0;
    numberArguments.map(a => {
        if (a !== 0) {
            trainingDays += 1;
        }
    });

    let average = 0;
    numberArguments.map(a => {
        average += a;
    });
    average = average / trainingDays;

    let rating = 1;
    if (average > 2 && average < 3) {
        rating = 2;
    }
    if (average > 3) {
        rating = 3;
    }

    const ratingDescriptions = [
        'Below average',
        'Average',
        'Above average'
    ];
    let ratingDescription = ratingDescriptions[0];
    if (rating == 2) {
        ratingDescription = ratingDescriptions[1];
    }
    if (rating == 3) {
        ratingDescription = ratingDescriptions[2];
    }

    const target = 2;
    
    let success = false;
    if (rating >= target) {
        success = true;
    } 

    return {
        periodLength: args.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };

};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exerciseCommentator = (args: string[]) => {
    const info = calculateExercisesConsole(args);

    console.log(info);
};


/*
try {
    exerciseCommentator(process.argv);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
*/