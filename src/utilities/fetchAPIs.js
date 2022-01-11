export function postAPI (url, method, body) {
  const options = {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options);
};
