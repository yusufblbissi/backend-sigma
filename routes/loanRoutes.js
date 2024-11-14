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

/**
 * @swagger
 * /submit:
 *   post:
 *     summary: Submit a loan application
 *     tags: [Loan Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Loan application submitted successfully
 *       400:
 *         description: Invalid input
 */
router.post("/submit", loanValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  submitLoanApplication(req, res);
});

/**
 * @swagger
 * /listOfCurrencies:
 *   get:
 *     summary: List available loan currencies
 *     tags: [Loan Applications]
 *     responses:
 *       200:
 *         description: List of available currencies
 */
router.get("/listOfCurrencies", listOfCurrencies);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get loan applications by ID
 *     tags: [Loan Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan application details
 *       404:
 *         description: Loan application not found
 */
router.get("/:id?", getLoanApplications);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a loan application by ID
 *     tags: [Loan Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan application deleted successfully
 *       500:
 *         description: Error deleting loan application
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteLoanApplication(id)
    .then(() => res.status(200).send("Loan application deleted successfully"))
    .catch((error) =>
      res.status(500).send("Error deleting loan application: " + error.message)
    );
});

export default router;
