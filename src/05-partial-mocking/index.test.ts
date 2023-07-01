// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => {
      return {};
    }),
    mockTwo: jest.fn(() => {
      return {};
    }),
    mockThree: jest.fn(() => {
      return {};
    }),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalled();
  });
});
