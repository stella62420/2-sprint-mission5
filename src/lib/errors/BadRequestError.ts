import HttpError from './HttpError';
export default class BadRequestError extends HttpError {
  constructor(message = 'Bad Request', payload?: unknown) {
    super(400, message, payload);
  }
}
