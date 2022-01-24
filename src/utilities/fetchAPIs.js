export function postHTTP(url, body) {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options).then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw Error(res.json().error);
    }
  })
  ;
}

export function getHTTP(url) {
  const options = {
    method: "GET",
  };

  return fetch(url, options).then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(res.json().error);
    }
  });
}
