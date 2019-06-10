// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let status = 500;
  if(err.status) status = err.status;

  // eslint-disable-next-line no-console
  console.error(err);

  res
    .status(status)
    .send(err);
};
