function setHeader(res, headerTitle, headerValue) {
  res.set(headerTitle, headerValue);
  res.send(`Header with title "${headerTitle}" and value "${headerValue}" was set`);
}

function getHeader(req, headerTitle) {
  return req.get(headerTitle);
}

module.exports = {
  setHeader,
  getHeader,
};
