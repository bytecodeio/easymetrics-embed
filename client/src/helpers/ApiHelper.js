const handleResponse = async (response) => {
  const isJson = response.headers?.get("content-type")?.includes("application/json");

  const data = isJson ? await response.json() : null;

  // Check if error response
  if (!response.ok) {
    // const { user, logout } = useUserStore();

    // Auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    // if ([401, 403].includes(response.status) && user) {
    //   logout();
    // }

    // Get error message from body or default to response status
    const error = (data && data.message) || response.status;

    return Promise.reject(error);
  }

  return data;
};

const request = (method) => {
  return (url, body, signal) => {
    const requestOptions = { method };

    if (!!signal) {
      requestOptions.signal = signal;
    }

    // Update options if it has the body in case of Non-GET calls
    if (method !== "GET" && !!body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }

    return fetch(url, requestOptions).then(handleResponse);
  };
};

export const api = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  patch: request("PATCH"),
  delete: request("DELETE"),
};
