import HttpError from './HttpError';
export default class NotFoundError extends HttpError {
  constructor(message = 'Not Found', payload?: unknown) {
    super(404, message, payload);
  }
}
