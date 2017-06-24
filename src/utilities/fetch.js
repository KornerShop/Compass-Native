const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return true
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const get = async uri => {
  const response = await fetch(uri, {headers})
  if (checkStatus(response)) {
    return await response.json()
  }
}
