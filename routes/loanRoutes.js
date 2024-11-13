import express from "express";
import {
  submitLoanApplication,
  getLoanApplications,
  listOfCurrencies,
  deleteLoanApplication,
} from "../controllers/loanController.js";
import loanValidation from "../validation/loanValidation.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.post("/submit", loanValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  submitLoanApplication(req, res);
});

router.get("/listOfCurrencies", listOfCurrencies);

router.get("/:id?", getLoanApplications);

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteLoanApplication(id)
    .then(() => res.status(200).send("Loan application deleted successfully"))
    .catch((error) =>
      res.status(500).send("Error deleting loan application: " + error.message)
    );
});

// router.put("/:id", loanValidation, (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   updateLoanApplication(req, res);
// });

export default router;
