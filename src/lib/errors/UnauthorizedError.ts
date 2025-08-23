import HttpError from './HttpError';

export default class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized', details?: any) {
    super(401, message, details);
  }
}
