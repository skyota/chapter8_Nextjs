export const api ={
  get: async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
  },

  post: async <T>(url: string, body: T) => {
    return await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    });
  },
  
  put: async <T>(url: string, body: T) => {
    return await fetch(url, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    });
  },

  delete: async (url: string) => {
    return await fetch(url, {
      method: "DELETE",
    });
  },
};
