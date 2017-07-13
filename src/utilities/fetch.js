import portableFetch from 'portable-fetch';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return true;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export default async uri => {
  const response = await portableFetch(uri, { headers });
  if (checkStatus(response)) {
    const results = await response.json();
    return results;
  }
  return false;
};
