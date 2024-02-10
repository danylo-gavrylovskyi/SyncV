function setCookie(res, cookieTitle, cookieValue, httpOnly = false) {
  res.cookie(cookieTitle, cookieValue, { httpOnly });
  res.send(`Cookie with title "${cookieTitle}" and value "${cookieValue}" was set`);
}

function getCookie(req, cookieTitle) {
  return req.cookies[cookieTitle];
}

module.exports = {
  setCookie,
  getCookie,
};
