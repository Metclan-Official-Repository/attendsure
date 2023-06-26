const baseUrl = () => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BASE_URL_PROD;
  }
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_BASE_URL_PROD;
  }
};
export { baseUrl };
