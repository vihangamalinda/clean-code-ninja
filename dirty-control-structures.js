main();

function main() {
  const transactions = [
    {
      id: "t1",
      type: "PAYMENT",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "23.99",
    },
    {
      id: "t2",
      type: "PAYMENT",
      status: "OPEN",
      method: "PAYPAL",
      amount: "100.43",
    },
    {
      id: "t3",
      type: "REFUND",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "10.99",
    },
    {
      id: "t4",
      type: "PAYMENT",
      status: "CLOSED",
      method: "PLAN",
      amount: "15.99",
    },
  ];

  try {
    processTransactions(transactions);
  } catch (e) {
    logError(e);
  }
}

function processTransactions(transactions) {
  if (!isValidTransactions(transactions)) {
    console.log("No transactions provided!");
  } else {
    for (const transaction of transactions) {
      processTransaction(transaction);
    }
  }
}

function isValidTransactions(transactions) {
  return transactions && transactions.length > 0;
}

function processTransaction(transaction) {
  if (!isTypePayment(transaction) || !isTypeRefund(transaction)) {
    throw new Error("Invalid transaction type!", transaction);
  }

  if (!isStatusOpen(transaction)) {
    throw new Error("Invalid transaction type!", transaction);
  }

  if (isTypePayment(transaction)) {
    processPaymentTransaction(transaction);
  } else if (isTypeRefund(transaction)) {
    processRefundTransactions(transaction);
  }
}

function processRefundTransactions(transaction) {
  if (transaction.method === "CREDIT_CARD") {
    processCreditCardRefund(transaction);
  } else if (transaction.method === "PAYPAL") {
    processPayPalRefund(transaction);
  } else if (transaction.method === "PLAN") {
    processPlanRefund(transaction);
  }
}

function processPaymentTransaction(transaction) {
  if (transaction.method === "CREDIT_CARD") {
    processCreditCardPayment(transaction);
  } else if (transaction.method === "PAYPAL") {
    processPayPalPayment(transaction);
  } else if (transaction.method === "PLAN") {
    processPlanPayment(transaction);
  }
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

function processCreditCardPayment(transaction) {
  logSuccess(
    `Processing credit card payment for amount: ${transaction.amount}`
  );
}

function processCreditCardRefund(transaction) {
  logSuccess(`Processing credit card refund for amount: ${transaction.amount}`);
}

function processPayPalPayment(transaction) {
  logSuccess(`Processing PayPal payment for amount: ${transaction.amount}`);
}

function processPayPalRefund(transaction) {
  logSuccess(`Processing PayPal refund for amount: ${transaction.amount}`);
}

function processPlanPayment(transaction) {
  logSuccess(`Processing plan payment for amount: ${transaction.amount}`);
}

function processPlanRefund(transaction) {
  logSuccess(`Processing plan refund for amount: ${transaction.amount}`);
}

function logSuccess(message) {
  console.log(message);
}

function logError(message) {
  console.log(message);
}