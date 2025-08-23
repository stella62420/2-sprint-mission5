export default class HttpError extends Error {
  status: number;
  payload?: unknown;

  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.payload = payload;
    // V8 환경에서만 동작, 있어도 안전
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Error.captureStackTrace?.(this, HttpError);
  }
}
