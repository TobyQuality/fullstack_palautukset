import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({notification}) => {
    return notification
  })

  const style = notification[0]
  const message = notification[1]

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification