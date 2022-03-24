import Content from './Content'
import Header from './Header'

const Total = ({parts}) => {
    let totalNumberOfExercises = 0
    parts.map((part) => 
        totalNumberOfExercises += part.exercises 
    )
    return (<h3>total of {totalNumberOfExercises} exercises</h3>)
}

const Course = ({ course }) => {
    return(
        <div>
            <Header title={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}
export default Course