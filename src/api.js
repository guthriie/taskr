export const apiClient = configs => {
  const { baseUrl, headers } = configs

  const handleResponse = response => {
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText || 'Error'}`);
    }
    return response.json()
  }

  const post = (url = "/", body) => (
    fetch(`${baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    })
    .then(handleResponse)
  );

  const patch = (url = "/", body) => (
    fetch(`${baseUrl}${url}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers
    })
    .then(handleResponse)
  );

  const get = (url = "/") => (
    fetch(`${baseUrl}${url}`)
    .then(handleResponse)
  );

  return {
    post,
    patch,
    get
  };
};

export const tasksApi = apiClient({
  baseUrl: "https://jsonplaceholder.typicode.com/todos",
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});
