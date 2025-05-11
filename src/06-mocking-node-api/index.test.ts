// Uncomment the code below and write your tests
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockCallback, 1000);

    expect(setTimeout).toHaveBeenCalledWith(mockCallback, 1000);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();

    doStuffByTimeout(mockCallback, 1000);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, 1000);

    expect(setInterval).toHaveBeenCalledWith(mockCallback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, 1000);

    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalledTimes(3);
    jest.advanceTimersByTime(7000);
    expect(mockCallback).toHaveBeenCalledTimes(10);
  });
});

jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  const pathToFile = './expectedFile.txt';

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const text = 'something';

    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(text));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(text);
  });
});
