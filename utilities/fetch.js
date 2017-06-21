const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = response => response.json()

export const get = uri =>
  fetch(uri, {headers}).then(checkStatus).then(parseJSON)
