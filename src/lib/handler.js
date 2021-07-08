/**
const res = {
  error: {
    code: 200,
    status: true
  },
  data: []
}
*/

const RESPONSES = [
  { status: true, message: 'Success', code: 200 },
  { status: true, message: 'Not content', code: 204 },
  { status: false, message: 'Bad request', code: 400 },
  { status: false, message: 'Not found', code: 404 },
  { status: false, message: 'Server error', code: 500 },
  { status: false, message: 'Something went wrong', code: 666 },
]

const get = by => arr => by(arr)

const getResponse = (response) => RESPONSES.find(res => res.code === response.code) || RESPONSES.find(res => res.code === 666)

const response = get(getResponse)

module.exports = {
  response,
}
