export function Logger(req, res, next) {
  console.log(`${res.statusCode} | ${req.method} ${req._parsedUrl.path}`);
  next();
};