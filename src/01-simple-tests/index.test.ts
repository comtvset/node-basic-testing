// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const data = {
      a: 2,
      b: 3,
      action: Action.Add,
    };

    const result = simpleCalculator(data);
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const data = {
      a: 5,
      b: 3,
      action: Action.Subtract,
    };

    const result = simpleCalculator(data);
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const data = {
      a: 2,
      b: 2,
      action: Action.Multiply,
    };

    const result = simpleCalculator(data);
    expect(result).toBe(4);
  });

  test('should divide two numbers', () => {
    const data = {
      a: 6,
      b: 2,
      action: Action.Divide,
    };

    const result = simpleCalculator(data);
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const data = {
      a: 2,
      b: 2,
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(data);
    expect(result).toBe(4);
  });

  test('should return null for invalid action', () => {
    const data = {
      a: 1,
      b: 1,
      action: 'invalid',
    };

    const result = simpleCalculator(data);
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const data = {
      a: 'a',
      b: 'b',
      action: Action.Add,
    };

    const result = simpleCalculator(data);
    expect(result).toBe(null);
  });
});
