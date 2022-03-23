import { useState } from 'react'

const App = () => {

  const [evaluations, setEvaluations] = useState({good: 0, neutral: 0, bad: 0})

  const Header = (props) => <h1>{props.text}</h1>

  const EvaluationButton = (props) => <button onClick= {props.handleClick}>{props.text}</button>

  const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>
  
  const Statistics = () => {
    if (evaluations.good === 0 & evaluations.neutral === 0 & evaluations.bad === 0) {
      return ( <div><p>No feedback given</p></div> )
    }
    return (
      <table>
        <colgroup>
          <col/>
        </colgroup>
        <tbody>
          <StatisticLine text="good" value={evaluations.good} />
          <StatisticLine text="neutral" value={evaluations.neutral} />
          <StatisticLine text="bad" value={evaluations.bad} />
          <StatisticLine text="all" value={evaluations.good + evaluations.neutral + evaluations.bad} />
          <StatisticLine text="average" value={((-evaluations.bad) + evaluations.good) / (evaluations.good + evaluations.neutral + evaluations.bad)} />
          <StatisticLine text="positive" value= {(evaluations.good / (evaluations.good + evaluations.neutral + evaluations.bad))* 100 + " %"}  />
        </tbody>
      </table>
    )
  }

  //App return
  return (
    <div>
      <>
        <Header text="give feedback" />
        <EvaluationButton handleClick={ () => setEvaluations({...evaluations, good: evaluations.good + 1 }) } text={"good"} />
        <EvaluationButton handleClick={ () => setEvaluations({...evaluations, neutral: evaluations.neutral + 1 }) } text={"neutral"} />
        <EvaluationButton handleClick={ () => setEvaluations({...evaluations, bad: evaluations.bad + 1 }) } text={"bad"} />
      </>
      <>
        <Header text="statistics" />
        <Statistics />
      </>
    </div>
  )

}

export default App