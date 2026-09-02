module.exports = async (req, res) => {
  const code = req.query.code;
  const SHEET_CSV_URL = process.env.SHEET_CSV_URL;
  const FALLBACK_URL = 'https://tiptapreviews.com';

  if (!code || !SHEET_CSV_URL) {
    return res.redirect(302, FALLBACK_URL);
  }

  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    const rows = csvText
      .split(/\r?\n/)
      .map(row => row.split(','));

    const clean = value =>
      value ? value.trim().replace(/^"|"$/g, '').trim() : '';

    const match = rows.find(
      row => clean(row[0]).toLowerCase() === code.toLowerCase()
    );

    if (match && clean(match[1])) {
      return res.redirect(302, clean(match[1]));
    }

    return res.redirect(302, FALLBACK_URL);
  } catch (error) {
    return res.redirect(302, FALLBACK_URL);
  }
};
