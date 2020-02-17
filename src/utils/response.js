class Response {
  static error(res, code, message) {
    return res.status(code).json({
      status: code,
      message,
    });
  }

  static success(res, code, data, message = 'Success') {
    return res.status(code).json({
      status: code,
      message,
      data
    });
  }
}

export default Response;
