export default ({req, res}) => {
  const context = req.context;

  delete req.context;

  return {req, res, ...context};
};

export const contextMiddleware = (context = {}) => (req, res, next) => {
  req.context = {
    ...context,
  };

  return next();
};
