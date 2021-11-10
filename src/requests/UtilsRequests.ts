export const getConfig = (token: string) => {
  return {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  };
};
