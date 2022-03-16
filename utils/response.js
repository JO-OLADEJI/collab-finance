const response = (responseObject) => {
  return {
    'success': true,
    'result': responseObject,
    'error': null
  };
}

module.exports = response;