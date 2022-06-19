import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({value, text}) => (
      <tr><td><p>{text}</p></td><td> <p>{value}</p></td></tr>
)

const CalculateAverage = (good, neutral, bad) => {
  const total = good + neutral + bad
  return (good - bad) / total
}

const CalculatePositivePercentage = (good, neutral, bad) => {
  const total = good + neutral + bad
  return (good / total * 100)
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No Feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={good + neutral + bad} />
          <StatisticLine text='average' value={CalculateAverage(good, neutral, bad)} />
          <StatisticLine text='positive' value={CalculatePositivePercentage(good, neutral, bad)} />
        </tbody>
      </table>

    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const HandleGoodClick = () => setGood(good + 1)
  const HandleNeutralClick = () => setNeutral(neutral + 1)
  const HandleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={HandleGoodClick} text='good' />
      <Button handleClick={HandleNeutralClick} text='neutral'/>
      <Button handleClick={HandleBadClick} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App