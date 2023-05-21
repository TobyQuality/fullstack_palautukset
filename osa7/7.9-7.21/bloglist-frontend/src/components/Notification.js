import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notificationState = useNotificationValue()

  return (
    <div style={notificationState[0]}>
      {notificationState[1]}
    </div>
  )
}

export default Notification