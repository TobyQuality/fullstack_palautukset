const Header = (props) =>
  <h1>{props.course}</h1>

const Part = (props) => 
  <p>{props.part} {props.exercises}</p>

const Total = (props) =>
  <p>Number of exercises {props.total}</p>

function App() {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const p1 = <Part part={part1} exercises={exercises1}/>
  const p2 = <Part part={part2} exercises={exercises2}/>
  const p3 = <Part part={part3} exercises={exercises3}/>

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
      <Header course='Half Stack application development' />

      <Content />

      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
  
}

export default App
