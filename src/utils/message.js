import { Message } from 'element-ui'
const message = (showClose, message, type) => {
  Message({
    showClose: showClose,
    message: message,
    type: type
  });
}

export {message}