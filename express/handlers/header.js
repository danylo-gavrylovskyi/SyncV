function setHeader(res, headerTitle, headerValue) {
  res.set(headerTitle, headerValue);
  res.send('Header was set');
}

function getHeader(req, headerTitle) {
  console.log(req);
  return req.get(headerTitle);
}

module.exports = {
  setHeader,
  getHeader,
};
