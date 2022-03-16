const error = (errorMessage) => {
  return {
    'result': false,
    'data': null,
    'error': errorMessage + ' ❗'
  };
}

module.exports = error;