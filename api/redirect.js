module.exports = async (req, res) => {
  const { code } = req.query;

  const SHEET_CSV_URL = process.env.SHEET_CSV_URL;
  const FALLBACK_URL = 'https://tiptapreviews.com';

  if (!code) {
    res.writeHead(302, { Location: FALLBACK_URL });
    return res.end();
  }

  if (!SHEET_CSV_URL) {
    res.writeHead(302, { Location: FALLBACK_URL });
    return res.end();
  }

  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    const rows = csvText.split('\n').map((row) => row.split(','));

    const clean = (s) => s ? s.trim().replace(/^"+|"+$/g, '').trim() : s;

    const match = rows.find(
      (row) => row[0] && clean(row[0]).toLowerCase() === String(code).toLowerCase()
    );

    if (match && match[1] && clean(match[1])) {
      const destination = clean(match[1]);
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
