const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.excercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part.name} excercises={part.excercises}/>
      )}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of excercises {props.parts[0].excercises + props.parts[1].excercises + props.parts[2].excercises}</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        excercises: 10,
        id: 1
      },
      { 
        name: 'Using props to pass data',
        excercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        excercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )

  // return (
  //   <div>
  //     <Header course={course.name} />
  //     <Content parts={course.parts}/>
  //     <Total parts={course.parts}/>
  //   </div>
  // )
}

export default App