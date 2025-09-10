export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const asHttpError = (e: unknown, fallback = 500) => {
  if ((e as any)?.name === 'StructError') {
    return new HttpError(400, (e as any).message ?? 'Bad Request');
  }
  const pe = e as any;
  if (pe?.code === 'P2002') return new HttpError(409, 'Unique constraint failed');
  if (pe?.code === 'P2025') return new HttpError(404, 'Record not found');
  if (e instanceof HttpError) return e;
  return new HttpError(fallback, (e as any)?.message ?? 'Internal Server Error');
};
