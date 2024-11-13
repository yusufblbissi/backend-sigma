import { body } from "express-validator";

const loanValidation = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("loanAmount").isNumeric().withMessage("Loan Amount must be a number"),
  body("loanTerm")
    .isInt({ min: 1 })
    .withMessage("Loan Term must be a positive integer"),
  body("currency").not().isEmpty().withMessage("Currency is required"),
  body("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number format"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];

export default loanValidation;
