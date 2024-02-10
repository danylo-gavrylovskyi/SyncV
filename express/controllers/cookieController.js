const { getCookie, setCookie } = require('../handlers/cookie');

// http://localhost:3400/cookie/get/my
async function getCookieController(req, res) {
  try {
    const cookieTitle = req.params.cookieTitle;
    if (!cookieTitle) return res.status(400).json({ error: 'Cookie title was not specified' });

    const cookie = getCookie(req, cookieTitle);
    if (!cookie) return res.send('Cookie not found');

    return res.send(`Cookie value is '${cookie}'`);
  } catch (error) {
    console.error('Error while getting cookie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// http://localhost:3400/cookie/set?cookieTitle=my&cookieValue=favorite
async function setCookieController(req, res) {
  try {
    const cookieTitle = req.query.cookieTitle;
    const cookieValue = req.query.cookieValue;
    const httpOnly = req.query.httpOnly === 'true';
    if (!cookieTitle || !cookieValue)
      return res.status(400).json({ error: 'Cookie title and/or value was not specified' });

    setCookie(res, cookieTitle, cookieValue, httpOnly);
  } catch (error) {
    console.error('Error while getting cookie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getCookieController,
  setCookieController,
};
