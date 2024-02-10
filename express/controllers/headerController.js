const { getHeader, setHeader } = require('../handlers/header');

// http://localhost:3400/header/get/connection
async function getHeaderController(req, res) {
  try {
    const headerTitle = req.params.headerTitle;
    if (!headerTitle) return res.status(400).json({ error: 'Header title was not specified' });

    const header = getHeader(req, headerTitle);
    if (!header) return res.send('Header not found');

    return res.send(`Header value is '${header}'`);
  } catch (error) {
    console.error('Error while getting header:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// http://localhost:3400/header/set?headerTitle=my&headerValue=favorite
async function setHeaderController(req, res) {
  try {
    const headerTitle = req.query.headerTitle;
    const headerValue = req.query.headerValue;
    if (!headerTitle || !headerValue)
      return res.status(400).json({ error: 'Header title and/or value was not specified' });

    setHeader(res, headerTitle, headerValue);
  } catch (error) {
    console.error('Error while getting header:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getHeaderController,
  setHeaderController,
};
