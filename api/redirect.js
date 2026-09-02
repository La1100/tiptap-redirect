export default async function handler(req, res) {
  const { code } = req.query;

  const SHEET_CSV_URL = process.env.SHEET_CSV_URL;
  const FALLBACK_URL = 'https://tiptapreviews.com';

  if (!code || !SHEET_CSV_URL) {
    return res.redirect(302, FALLBACK_URL);
  }

  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    const rows = csvText.split('\n').map((row) => row.split(','));

    const clean = (s) =>
      s ? s.trim().replace(/^"+|"+$/g, '').trim() : s;

    const match = rows.find(
      (row) =>
        row[0] &&
        clean(row[0]).toLowerCase() === String(code).toLowerCase()
    );

    if (match && match[1] && clean(match[1])) {
      return res.redirect(302, clean(match[1]));
    }

    return res.redirect(302, FALLBACK_URL);
  } catch (err) {
    return res.redirect(302, FALLBACK_URL);
  }
}
