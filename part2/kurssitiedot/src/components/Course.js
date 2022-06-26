const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.part} {props.exercises}</p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce(
      (previous, current) => previous + current.exercises, 
    0
    )
  
    return (
      <b>Number of exercises {total}</b> 
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course