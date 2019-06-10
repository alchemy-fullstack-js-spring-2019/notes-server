// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Server Error';

  // eslint-disable-next-line no-console
  console.error(err);

  res
    .status(status)
    .send({ status, message });
};
