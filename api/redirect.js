module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.writeHead(302, { Location: 'https://tiptapreviews.com' });
    return res.end();
  }

  const SHEET_CSV_URL = process.env.SHEET_CSV_URL;
  const FALLBACK_URL = 'https://tiptapreviews.com';

  if (!SHEET_CSV_URL) {
    res.writeHead(302, { Location: FALLBACK_URL });
    return res.end();
  }

  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    const rows = csvText.split('\n').map((row) => row.split(','));

    const match = rows.find(
      (row) => row[0] && row[0].trim().toLowerCase() === String(code).toLowerCase()
    );

    if (match && match[1] && match[1].trim()) {
      const destination = match[1].trim();
      res.writeHead(302, { Location: destination });
      return res.end();
    }

    res.writeHead(302, { Location: FALLBACK_URL });
    return res.end();
  } catch (err) {
    res.writeHead(302, { Location: FALLBACK_URL });
    return res.end();
  }
};
