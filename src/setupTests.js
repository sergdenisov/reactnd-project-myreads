global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.fetch = jest.fn(
  url => url.includes('/books') && new Promise(resolve => resolve({ json: () => ({ books: [] }) })),
);
