import { useNotificationValue } from '../NotificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const notificationState = useNotificationValue()

  return (
    <Alert severity={notificationState[0]}>
      {notificationState[1]}    
    </Alert>
  )
}

export default Notification