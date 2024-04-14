class Transaction {
  constructor(id, type, status, method, amount) {
    this.id = id;
    this.type = type;
    this.status = status;
    this.method = method;
    this.amount = amount;
  }

  getTransactionMethod() {
    return this.method.replace("_", " ").toLowerCase();
  }
}

main();
// Last transaction should throw an error as its a closed transaction
function main() {
  const transactions = [
    new Transaction("t1", "PAYMENT", "OPEN", "CREDIT_CARD", "23.99"),
    new Transaction("t2", "PAYMENT", "OPEN", "PAYPAL", "100.43"),
    new Transaction("t3", "REFUND", "OPEN", "CREDIT_CARD", "10.99"),
    new Transaction("t4", "PAYMENT", "CLOSED", "PLAN", "15.99"),
  ];

  try {
    processTransactions(transactions);
  } catch (e) {
    logError(e);
  }
}

function processTransactions(transactions) {
  if (!isValidTransactions(transactions)) {
    throw new Error("No transactions provided!");
  }

  for (const transaction of transactions) {
    processTransaction(transaction);
  }
}

function isValidTransactions(transactions) {
  return transactions && transactions.length > 0;
}

function processTransaction(transaction) {
  if (!isTypePayment(transaction) && !isTypeRefund(transaction)) {
    throw new Error("Invalid transaction type!", transaction);
  }

  if (!isStatusOpen(transaction)) {
    throw new Error("Invalid transaction type!", transaction);
  }

  logSuccess(
    `Processing ${transaction.getTransactionMethod()} ${transaction.type.toLowerCase()} for amount: ${
      transaction.amount
    }`
  );
}

function isStatusOpen(transaction) {
  return transaction.status === "OPEN";
}

function isTypeRefund(transaction) {
  return transaction.type === "REFUND";
}

function isTypePayment(transaction) {
  return transaction.type === "PAYMENT";
}

function logSuccess(message) {
  console.log(message);
}

function logError(message) {
  console.log(message);
}
