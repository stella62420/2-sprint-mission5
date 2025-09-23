export {};

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

let __originalConsoleError__: (...args: any[]) => void;

beforeAll(() => {
  __originalConsoleError__ = console.error;
  console.error = (...args: any[]) => {
    const first = String(args?.[0] ?? '');
    if (first.includes('[expect')) {
      __originalConsoleError__(...args);
      return;
    }
    if (process.env.DEBUG_TESTS === '1') {
      __originalConsoleError__(...args);
    }
  };
});

afterAll(() => {
  if (__originalConsoleError__) {
    console.error = __originalConsoleError__;
  }
});
