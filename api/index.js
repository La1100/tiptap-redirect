module.exports = (req, res) => {
  res.status(200).send(`Kod: ${req.query.code || 'nema'}`);
};
