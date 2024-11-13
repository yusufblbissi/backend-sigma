import axios from "axios";
import Loan from "../models/Loan.js";
import config from "../config/config.js";
import {
  getCurrencyConversionRate,
  getListOfCurrencies,
} from "../utils/currencyService.js";

export const submitLoanApplication = async (req, res) => {
  const { name, loanAmount, loanTerm, currency, email, phoneNumber } = req.body;
  const convertCurrencies = ["USD", "GBP"];
  try {
    if (!name || !loanAmount || !loanTerm || !currency) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const conversionRate = await getCurrencyConversionRate(
      loanAmount,
      currency,
      convertCurrencies
    );

    const loan = new Loan({
      name,
      loanAmount,
      currency,
      loanTerm,
      convertedInUSD: conversionRate.data.USD.value,
      loanAmountGBP: conversionRate.data.GBP.value,
      email,
      phoneNumber,
    });

    await loan.save();

    return res.status(201).json(loan);
  } catch (error) {
    console.error("Error submitting loan application:", error.message);
    return res.status(500).json({
      message: "Error submitting loan application",
      error: error.message,
    });
  }
};

export const getLoanApplications = async (req, res) => {
  try {
    if (req.params.id) {
      const loan = await Loan.findById(req.params.id);

      if (!loan) {
        return res.status(404).json({
          success: false,
          message: "Loan not found",
        });
      }

      return res.status(200).json({
        success: true,
        loanData: loan,
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const loans = await Loan.find().skip(skip).limit(limit).lean();

    const totalLoans = await Loan.countDocuments();

    const totalPages = Math.ceil(totalLoans / limit);

    const data = {
      success: true,
      loansData: loans,
      total: totalLoans,
      pages: totalPages,
      currentPage: page,
    };

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching loan applications",
      error: error.message || error,
    });
  }
};

export const listOfCurrencies = async (req, res) => {
  const data = await getListOfCurrencies();
  return res.status(200).json(data);
};
// loanController.js

export const deleteLoanApplication = async (loanId) => {
  try {
    const loan = await Loan.findById(loanId);
    if (!loan) {
      throw new Error("Loan application not found");
    }

    await Loan.findByIdAndDelete(loanId);
  } catch (error) {
    console.error("Error deleting loan application:", error);
    throw error; 
  }
};

export const updateLoanApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Add logic to update the loan application in the database
    const result = await LoanModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    return res
      .status(200)
      .json({ message: "Loan application updated successfully", data: result });
  } catch (error) {
    console.error("Error updating loan application:", error);
    return res.status(500).json({ message: "Error updating loan application" });
  }
};
