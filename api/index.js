module.exports = async (req, res) => {
  const code = String(req.query.code || '').trim().toLowerCase();

  const SHEET_CSV_URL = process.env.SHEET_CSV_URL;

  if (!code || !SHEET_CSV_URL) {
    return res.redirect(302, 'https://tiptapreviews.com');
  }

  try {
    const response = await fetch(SHEET_CSV_URL);

    if (!response.ok) {
      return res.redirect(302, 'https://tiptapreviews.com');
    }

    const csvText = await response.text();

    const lines = csvText.split(/\r?\n/);

    for (const line of lines) {
      const parts = line.split(',');

      const sheetCode = String(parts[0] || '')
        .trim()
        .replace(/^["']|["']$/g, '')
        .toLowerCase();

      const destination = String(parts.slice(1).join(',') || '')
        .trim()
        .replace(/^["']|["']$/g, '');

      if (sheetCode === code && destination) {
        return res.redirect(302, destination);
      }
    }

    return res.redirect(302, 'https://tiptapreviews.com');

  } catch (error) {
    return res.redirect(302, 'https://tiptapreviews.com');
  }
};
