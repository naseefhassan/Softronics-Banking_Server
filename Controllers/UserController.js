const AccountSchema = require("../Model/AccountSchema");
const DepositSchema = require("../Model/DepositSchema");
const object = {
  AccountDetails: async (req, res) => {
    try {
      const { accountNumber, IFSC } = req.body;
      const userId = req.user.id;
      const Account = new AccountSchema({
        userId: userId,
        accountNumber: accountNumber,
        IFSC: IFSC,
      });
      Account.save();
      res.status(200).json({ message: "account detailes saving success" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "error in saving account detailes" });
    }
  },
  deposit: async (req, res) => {
    try {
      const { accountNumber, IFSC, amount } = req.body;
      const userId = req.user.id;
      const deposit = new DepositSchema({
        userId: userId,
        accountNumber: accountNumber,
        IFSC: IFSC,
        amount,
        amount,
      });
      deposit.save();
      res.status(200).json({ message: "deposition success" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "error in depositing" });
    }
  },
  history: async (req, res) => {
    try {
        const history = await DepositSchema.find()
        res.status(200).json({ message: "history fetching success",history });

    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "error in fetching history" });
    }
  },
};

module.exports = object;
