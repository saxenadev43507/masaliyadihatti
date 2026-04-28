# Masaliya Di Hatti - Ecommerce App

A full-stack ecommerce project using Next.js (App Router), Tailwind CSS, Node.js, Express, and MongoDB.

## Prerequisites
- Node.js installed (v18+)
- MongoDB locally installed and running or a reachable URI

## Running the Application Locally

The project consists of two separate environments: the backend server and the frontend client. You must run both concurrently.

### 1. Start the Backend Server
```bash
cd server
npm install
npm start
```
The server will start at `http://localhost:5000`. 
(Note: You might see a DB error if MongoDB is not running locally. The server is configured to handle the error and still serve API endpoints gracefully.)

### 2. Start the Frontend Client
Open a **new terminal tab**:
```bash
cd client
npm install
npm run dev
```
The client will start at `http://localhost:3000`.

### 3. Verify
Open `http://localhost:3000` in your browser. You will see the products displayed cleanly!
Wait until Next.js compiles the page.
