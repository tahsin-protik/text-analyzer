# Text Analysis API

This project is a RESTful API for text analysis, built with Node.js, Express, and TypeScript.

## Features

- CRUD operations for text entries
- Text analysis endpoints:
  - Word count
  - Character count
  - Sentence count
  - Paragraph count
  - Longest words in paragraphs

## Prerequisites

- Node.js (v18 or later)
- npm
- PostgreSQL

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/tahsin-protik/text-analyzer.git
   cd text-analyzer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to create a new `.env` file in the root directory:
   ```
   cp .env.example .env
   ```
   Then, open the `.env` file and adjust the values according to your setup:


## Running the Application

To start the server in development mode:
```
npm run dev
```
To start the server in production mode:
```
npm run build
npm start
```

### Testing the Application
Run the test
```
npm run test
```
Run the tests with coverage:
```
npm run test:coverage
npm run coverage:open
```






