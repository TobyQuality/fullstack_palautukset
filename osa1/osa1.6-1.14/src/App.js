import { useState } from 'react'

const App = () => {

  const [evaluations, setEvaluations] = useState({good: 0, neutral: 0, bad: 0})

  const EvaluationButton = (props) => <button onClick= {props.handleClick}>{props.text}</button>
  const Statistics = () => {
    if (evaluations.good === 0 & evaluations.neutral === 0 & evaluations.bad === 0) {
      return ( <div><p>No feedback given</p></div> )
    }
    return (
      <div>
        <p>good {evaluations.good}</p>
        <p>neutral {evaluations.neutral}</p>
        <p>bad {evaluations.bad}</p>
        <p>all {evaluations.good + evaluations.neutral + evaluations.bad}</p>
        <p>average { ((-evaluations.bad) + evaluations.good) / (evaluations.good + evaluations.neutral + evaluations.bad) }</p>
        <p>positive { (evaluations.good / (evaluations.good + evaluations.neutral + evaluations.bad))* 100} %</p>
      </div>
    )
  }

  return (
    <div>
      <>
        <h1>give feedback</h1>
        <EvaluationButton handleClick={ () => setEvaluations({...evaluations, good: evaluations.good + 1 }) } text={"good"} />
        <EvaluationButton handleClick={ () => setEvaluations({...evaluations, neutral: evaluations.neutral + 1 }) } text={"neutral"} />
        <EvaluationButton handleClick={ () => setEvaluations({...evaluations, bad: evaluations.bad + 1 }) } text={"bad"} />
      </>
      <>
        <h1>statistics</h1>
        <Statistics />
      </>
    </div>
  )
  
}

export default App