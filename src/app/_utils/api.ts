export const api ={
  get: async (url: string, token?: string) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        ...(token ? { Authorization: token } : {}),
      },
    });
  },

  post: async <T>(url: string, body: T, token?: string) => {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      body: JSON.stringify(body),
    });
  },
  
  put: async <T>(url: string, body: T, token?: string) => {
    return await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      body: JSON.stringify(body),
    });
  },

  delete: async (url: string, token?: string) => {
    return await fetch(url, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: token } : {}),
      },
    });
  },
};
