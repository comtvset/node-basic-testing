// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

type TestCase = {
  a: number;
  b: number;
  action: Action;
  expected: number;
};

const testCases: TestCase[] = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 2, action: 'invalid', expected: null } as unknown as TestCase,
  {
    a: 'a',
    b: 'b',
    action: Action.Exponentiate,
    expected: null,
  } as unknown as TestCase,
];

describe('simpleCalculator', () => {
  const testCallback =
    ({ a, b, action, expected }: TestCase) =>
    () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    };

  test('should return correct results for various operations', () => {
    testCases.forEach((testData) => {
      testCallback(testData)();
    });
  });
});
