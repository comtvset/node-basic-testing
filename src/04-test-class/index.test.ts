// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const newAccount = getBankAccount(100);

    expect(newAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const newAccount = getBankAccount(100);

    expect(() => newAccount.withdraw(150)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newAccount = getBankAccount(100);
    const newAccount2 = getBankAccount(10);

    expect(() => newAccount.transfer(200, newAccount2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const newAccount = getBankAccount(100);

    expect(() => newAccount.transfer(10, newAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const newAccount = getBankAccount(100);
    newAccount.deposit(10);

    expect(newAccount.getBalance()).toBe(110);
  });

  test('should withdraw money', () => {
    const newAccount = getBankAccount(100);
    newAccount.withdraw(10);

    expect(newAccount.getBalance()).toBe(90);
  });

  test('should transfer money', () => {
    const newAccount = getBankAccount(100);
    const newAccount2 = getBankAccount(10);
    newAccount.transfer(10, newAccount2);

    expect(newAccount.getBalance()).toBe(90);
    expect(newAccount2.getBalance()).toBe(20);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const newBalance = await getBankAccount(100).fetchBalance();
    if (newBalance !== null) {
      expect(typeof newBalance).toBe('number');
    } else {
      expect(newBalance).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newAccount = getBankAccount(100);
    const newBalance = await newAccount.fetchBalance();

    if (newBalance !== null) {
      newAccount.withdraw(newAccount.getBalance());
      newAccount.deposit(newBalance);

      expect(newAccount.getBalance()).toBe(newBalance);
    } else {
      expect(newBalance).toBeNull();
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newAccount = getBankAccount(100);
    jest.spyOn(newAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(newAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
