const RESPONSES = {
  200: {status: true, message: 'Success'},
  204: {status: true, message: 'Not content'},
  400: {status: false, message: 'Bad request'},
  404: {status: false, message: 'Not found'},
  500: {status: false, message: 'Server error'},
  666: {status: false, message: 'Something went wrong'},
}

const isSuccess = response => response.error && response.error.status === true

const getData = response => response.data || null

const getError = code => code ? RESPONSES[code] : RESPONSES[666]

const get = by => arr => by(arr)

const getSuccess = get(isSuccess);

const data = get(getData)

const error = get(getError)

const getResponse = (response) => ({error: error(response), data: data(response)})

/**
const res = {
  error: {
    code: 200,
    status: true
  },
  data: []
}
*/

module.exports = {
  getResponse,
  getSuccess,
  getError,
}