const Notification = ( { message } ) => {
  const colorCode = message.colorCode
  const messageStyle = (colorCode) => {
    let notificationStyling = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (colorCode === 'red') {
      notificationStyling = { ...notificationStyling, color: 'red' }
      return notificationStyling
    }

    if (colorCode === 'green') {
      notificationStyling = { ...notificationStyling, color: 'green' }
      return notificationStyling
    }
  }

  if (message.msg.length === 0) {
    return null
  }

  return(
    <div style={messageStyle(colorCode)}>
      {message.msg}
    </div>
  )
}

export default Notification