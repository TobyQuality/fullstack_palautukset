const Total = ( {parts }) => {
    
    const total = parts.reduce((sum, part) => {
        //console.log('Iteration:', sum, part)
        return sum + part.exercises 
    }, 0)

    return (<h4>total of {total} exercises</h4>)
}

export default Total