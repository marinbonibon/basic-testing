// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from ".";

describe("BankAccount", () => {
  // const initBalance = 200;
  // const account = getBankAccount(initBalance);
  // const newAccount = getBankAccount(300);

  test("should create account with initial balance", () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    expect(account.getBalance()).toBe(initBalance);
  });

  test("should throw InsufficientFundsError error when withdrawing more than balance", () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    const amount = 300;
    expect(() => account.withdraw(amount)).toThrow(InsufficientFundsError);
  });

  test("should throw error when transferring more than balance", () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    const newAccount = getBankAccount(300);
    const amount = 400;
    expect(() => account.transfer(amount, newAccount)).toThrow(InsufficientFundsError);
  });

  test("should throw error when transferring to the same account", () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    const amount = 100;
    expect(() => account.transfer(amount, account)).toThrow(TransferFailedError);
  });

  test("should deposit money", () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    const amount = 10;
    const newBalance = 210;
    account.deposit(amount);
    expect(account.getBalance()).toBe(newBalance);
  });

  test("should withdraw money", () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    const amount = 20;
    const newBalance = 180;
    account.withdraw(amount);
    expect(account.getBalance()).toBe(newBalance);
  });

  test("should transfer money", () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    const amount = 50;
    const newBalance = 150;
    const newAccount = getBankAccount(300);
    const newAccountBalance = 350;
    account.transfer(amount, newAccount);
    expect(account.getBalance()).toBe(newBalance);
    expect(newAccount.getBalance()).toBe(newAccountBalance);
  });

  test("fetchBalance should return number in case if request did not failed", async () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    account.fetchBalance = jest.fn().mockResolvedValue(50);
    await account.synchronizeBalance();
    expect(typeof account.getBalance()).toBe("number");
  });

  test("should set new balance if fetchBalance returned number", async () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    const mockedValue = 50;
    account.fetchBalance = jest.fn().mockResolvedValue(mockedValue);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mockedValue);
  });

  test("should throw SynchronizationFailedError if fetchBalance returned null", async () => {
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    account.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
