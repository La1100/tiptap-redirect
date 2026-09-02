module.exports = async (req, res) => {
  const code = req.query.code;

  res.status(200).send(`Kod: ${code || 'nema'}`);
};
