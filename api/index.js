module.exports = async (req, res) => {
  const code = req.query.code;

  if (code === 'c001') {
    return res.status(200).send('C001 RADI');
  }

  return res.status(200).send(`Kod: ${code || 'nema'}`);
};
