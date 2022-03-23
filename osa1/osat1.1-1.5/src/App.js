const Header = (props) =>
  <h1>{props.course}</h1>

const Part = (props) => 
  <p>{props.part} {props.exercises}</p>

const Total = (props) =>
  <p>Number of exercises {props.total}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const p1 = <Part part={course.parts[0].name} exercises={course.parts[0].exercises}/>
  const p2 = <Part part={course.parts[1].name} exercises={course.parts[1].exercises}/>
  const p3 = <Part part={course.parts[2].name} exercises={course.parts[2].exercises}/>

  const Content = () => {
    return (
      <div>
        {p1}
        {p2}
        {p3}
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name} />

      <Content />

      <Total total={course.parts[0].exercises + course.parts[0].exercises + course.parts[0].exercises} />
    </div>
  )
  
}

export default App
