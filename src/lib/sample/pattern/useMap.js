// use Map
const actions = new Map([
  ['1', ['processing']],
  ['2', ['fail']],
  ['3', ['fail']],
  ['4', ['success']],
  ['5', ['cancel']],
  ['default', ['other']]
])

const clickHandler = (status) => actions.get(status) || actions.get('default')