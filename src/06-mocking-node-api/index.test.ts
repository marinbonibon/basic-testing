// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 100;
    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 100);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
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
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 100;
    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 100);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(300);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockFileData = {
    '/path/to/file.txt': 'Mocked file content',
  };

  test('should call join with pathToFile', async () => {
    const filePath = '/path/to/file.txt';
    const mockJoin = jest.spyOn(path, 'join');
    fs.existsSync = jest.fn();
    await readFileAsynchronously(filePath);
    expect(mockJoin).toBeCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    const filePath = '/path/to/file.txt';
    fs.existsSync = jest.fn().mockReturnValue(false);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const filePath = '/path/to/file.txt';
    fs.existsSync = jest.fn().mockReturnValue(true);
    fs.promises.readFile = jest.fn().mockResolvedValue(mockFileData[filePath]);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBe(mockFileData[filePath]);
  });
});
