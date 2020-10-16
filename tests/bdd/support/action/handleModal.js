
/**
 * Handle a modal
 * @param  {String}   action    Action to perform on the modal (accept, dismiss)
 * @param  {String}   modalType Type of modal (alertbox, confirmbox, prompt)
 */
const handleModal = (action, modalType) => {
  const command = modalType === 'alertbox'
    ? 'acceptAlert'
    : "".concat(action.slice(0, 1)
        .toLowerCase()).concat(action.slice(1), "Alert")

  browser[command]()
}

module.exports = {
  handleModal
}