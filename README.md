# Project Setup Guide

Follow these steps to set up and run the project locally.

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed.
- Install [MongoDB](https://www.mongodb.com/) for your database.
- Install [MongoDB Compass](https://www.mongodb.com/products/compass) for easy database management.

### Steps

1. **Install MongoDB and Run Server**
   - Download and install MongoDB from the [official MongoDB website](https://www.mongodb.com/try/download/community).
   - After installation, start the MongoDB server:
     ```bash
     mongod
     ```
   - This will run the MongoDB server on the default port `27017`.

2. **Install MongoDB Compass**
   - Download and install MongoDB Compass from the [official MongoDB Compass website](https://www.mongodb.com/products/compass).
   - This tool allows you to visualize and manage your MongoDB data.

3. **Connect to Your Local MongoDB**
   - Open MongoDB Compass.
   - Connect to your local MongoDB server using the URI:
     ```
     mongodb://localhost:27017
     ```

4. **Install Node Modules**
   - Navigate to the project directory and run:
     ```bash
     npm install
     ```
   - This will install all the necessary dependencies listed in `package.json`.

5. **Start the Server**
   - Run the server using Nodemon:
     ```bash
     nodemon server.js
     ```
   - This will start your Node.js server, automatically restarting it upon file changes.

### API Routes

Once the server is running, use the following API routes:

- **Submit Loan Application**  
  `POST /api/loans/submit`  
  - Description: Submit a loan application with required data.
  - Example Request Body:
    ```json
    {
      "loanAmount": 5000,
      "currency": "USD",
      "duration": 12
    }
    ```
  - Validation errors will be returned with a `400` status code if any field is invalid.

- **Get List of Currencies**  
  `GET /api/loans/listOfCurrencies`  
  - Description: Retrieves a list of available currencies.
  - Response Example:
    ```json
    [
      "USD",
      "EUR",
      "GBP",
      ...
    ]
    ```

- **Get Loan Applications**  
  `GET /api/loans/:id?`  
  - Description: Retrieve loan applications. If an `id` is provided, fetches a specific loan application.
  - Example:
    - `GET /api/loans/` - Retrieves all loan applications.
    - `GET /api/loans/123` - Retrieves the loan application with ID `123`.

- **Delete Loan Application**  
  `DELETE /api/loans/:id`  
  - Description: Deletes a loan application with a specified ID.
  - Example: `DELETE /api/loans/123` will delete the loan application with ID `123`.

### Additional Notes
- Make sure MongoDB is running whenever you start the server.
- Access the server at `http://localhost:YOUR_PORT` (replace `YOUR_PORT` with your server's port number, often `3000`).

---

This completes the setup! You should now be able to interact with the API and database through your application.
