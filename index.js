const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const { link } = req.query;

  if (!link) {
    res.status(400).send('No link provided');
    return;
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(link);

  const buffer = await page.pdf({
    format: 'Legal',
    landscape: true,
    printBackground: true,
    margin: {
      left: '0px',
      top: '0px',
      right: '0px',
      bottom: '0px',
    },
  });
  await browser.close();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${'sertifikat'}.pdf"`);
  res.send(buffer);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
