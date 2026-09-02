module.exports = async (req, res) => {
  const code = String(req.query.code || '').trim().toLowerCase();
  const sheetUrl = process.env.SHEET_CSV_URL;

  if (!code || !sheetUrl) {
    return res.redirect(302, 'https://tiptapreviews.com');
  }

  try {
    const response = await fetch(sheetUrl);

    if (!response.ok) {
      return res.redirect(302, 'https://tiptapreviews.com');
    }

    const csv = (await response.text()).replace(/^\uFEFF/, '');

    const rows = csv
      .split(/\r?\n/)
      .map(line => {
        const match = line.match(/^"?([^",]+)"?,\s*"?([^"]*)"?$/);
        return match
          ? [match[1].trim(), match[2].trim()]
          : [];
      });

    const row = rows.find(
      r => r[0].toLowerCase() === code
    );

    if (row && /^https?:\/\//i.test(row[1])) {
      return res.redirect(302, row[1]);
    }

    return res.redirect(302, 'https://tiptapreviews.com');
  } catch {
    return res.redirect(302, 'https://tiptapreviews.com');
  }
};
