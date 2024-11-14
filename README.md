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

### Additional Notes
- Make sure MongoDB is running whenever you start the server.
- Access the server at `http://localhost:YOUR_PORT` (replace `YOUR_PORT` with your server's port number, often `3000`).

---

This completes the setup! You should now be able to interact with the database through your application.
