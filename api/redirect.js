module.exports = async (req, res) => {
  const { code, debug } = req.query;

  const SHEET_CSV_URL = process.env.SHEET_CSV_URL;
  const FALLBACK_URL = 'https://tiptapreviews.com';

  if (!SHEET_CSV_URL) {
    res.status(200).send('DEBUG: SHEET_CSV_URL environment variable is missing or empty.');
    return;
  }

  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    if (debug) {
      res.status(200).send(
        'HTTP status from Google: ' + response.status + '\n\n' +
        'First 500 characters of what we received:\n\n' +
        csvText.substring(0, 500)
      );
      return;
    }

    const rows = csvText.split('\n').map((row) => row.split(','));
    const match = rows.find(
      (row) => row[0] && row[0].trim().toLowerCase() === String(code).toLowerCase()
    );

    if (match && match[1] && match[1].trim()) {
      res.writeHead(302, { Location: match[1].trim() });
      return res.end();
    }

    res.writeHead(302, { Location: FALLBACK_URL });
    return res.end();
  } catch (err) {
    res.status(200).send('DEBUG ERROR: ' + err.message);
  }
};
