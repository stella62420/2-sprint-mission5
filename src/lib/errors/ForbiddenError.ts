import HttpError from './HttpError';
export default class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden', payload?: unknown) {
    super(403, message, payload);
  }
}
