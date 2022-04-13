const HttpErrorFactory = function() {}
HttpErrorFactory.prototype.createErrorClass = function(errorClassName) {
  const ErrorClass = function(message) {
      this.message = message;
  }
  ErrorClass.prototype = new Error();
  ErrorClass.prototype.name = errorClassName;
  
  return ErrorClass;
}

const httpErrorFactory = new HttpErrorFactory();

module.exports = {
    Http400Error: httpErrorFactory.createErrorClass("Http400Error"),
    Http401Error: httpErrorFactory.createErrorClass("Http401Error"),
    Http403Error: httpErrorFactory.createErrorClass("Http403Error"),
    Http404Error: httpErrorFactory.createErrorClass("Http404Error"),
    Http409Error: httpErrorFactory.createErrorClass("Http409Error"),
    Http500Error: httpErrorFactory.createErrorClass("Http500Error"),
};
