module.exports = (req, res) => {
  const code = req.query.code || 'nema-koda';
  res.status(200).send(`Kod je: ${code}`);
};
