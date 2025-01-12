const isTokenExpired = (token) => {
  if (!token) return true;
  const payloadBase64 = token.split(".")[1];
  const decodedJson = atob(payloadBase64);
  const decoded = JSON.parse(decodedJson);
  return decoded.exp * 1000 < Date.now();
};

export default isTokenExpired