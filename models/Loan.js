import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    currency: { type: String, required: true },
    loanTerm: { type: Number, required: true },
    convertedInUSD: { type: Number, required: true },
    loanAmountGBP: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
