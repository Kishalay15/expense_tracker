const mongoose = require('mongoose')
const Transaction = require("../models/Transaction")

//"/api/v1/transactions"
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//"/api/v1/transactions"
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        succes: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
};

//"/api/v1/transactions/:id"
exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid transaction ID format",
      });
    }

    console.log("entered delete", id)

    const transaction = await Transaction.findById(id)
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No Transaction found with the id",
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
