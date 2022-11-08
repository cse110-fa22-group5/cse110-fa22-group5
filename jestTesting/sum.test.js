const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

/*
sources: 
https://jestjs.io/docs/getting-started
https://github.com/marketplace/actions/run-jest
*/