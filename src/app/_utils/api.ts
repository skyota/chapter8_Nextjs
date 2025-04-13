export const api ={
  post: async (url: string, body: unknown) => {
    return await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    });
  },
  
  put: async (url: string, body: unknown) => {
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
