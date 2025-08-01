# Hyperliquid

## Project Overview

Hyperliquid is a cryptocurrency trading platform that allows users to trade various digital assets with the help of MetaMask integration and real-time market data sourced from the CoinMarketCap API. The platform features a user-friendly interface designed to facilitate secure trading, live price tracking, and easy deposit methods for Ethereum (ETH) and Tether (USDT).

## Installation

To get started with Hyperliquid, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/hyperliquid.git
   cd hyperliquid
   ```

2. **Install dependencies:**
   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:
   ```bash
   npm install
   ```

3. **Setup your environment variables:**
   Create a `.env` file in the root directory and specify any necessary environment variables required by your project.

4. **Start the server:**
   Launch the application in development mode using:
   ```bash
   npm run dev
   ```

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. Connect your MetaMask wallet to start trading.
3. Use the "Connect Wallet" button to link your wallet.
4. You can view cryptocurrency prices, check your total balance, deposit funds, and monitor the market status in real-time.

## Features

- **Secure Trading:** Integrated with MetaMask for safe transactions.
- **Real-time Market Data:** Access live cryptocurrency prices and market updates.
- **Easy Deposits:** Deposit ETH or USDT to start trading immediately.
- **User-Friendly Interface:** Designed for both beginners and experienced traders.
- **Responsive Design:** Optimized for various devices and screen sizes.

## Dependencies

Here are the key dependencies used in this project:

- **express** - ^4.18.2: A fast web framework for Node.js.
- **axios** - ^1.4.0: A promise-based HTTP client for the browser and Node.js.
- **dotenv** - ^16.3.1: A zero-dependency module that loads environment variables from a `.env` file.

## Project Structure

The project has the following directory structure:

```
hyperliquid/
├── favicon/
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   └── favicon-32x32.png
├── index.html               # Main entry point for the application
├── dashboard.html           # Dashboard for viewing statistics
├── professional-dashboard.html # Professional trading dashboard
├── privacy-policy.html      # Privacy policy page
├── terms.html               # Terms of use page
├── server.js                # Node.js server file
├── package.json             # Package configuration file
└── package-lock.json        # Locked dependency versions
```

## Deployment on Netlify

### Local Development with Netlify CLI

To test Netlify functions locally, first install the Netlify CLI:
```bash
# Option 1: Install globally
npm install -g netlify-cli

# Option 2: Use npx (no global installation needed)
npx netlify dev
```

> ℹ️ Global installation is recommended for frequent local testing. The `functions/` directory will be properly recognized by Netlify's development server.


To deploy this project on Netlify:

1. **Connect your GitHub repository:**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub account and select this repository

2. **Configure environment variables:**
   - In Netlify dashboard, go to "Site settings > Build environment > Environment"
   - Add the following variable:
     ```bash
     CMC_API_KEY=your_coinmarketcap_api_key
     ```
     (Replace with your actual [CoinMarketCap API key](https://coinmarketcap.com/api/))

3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `functions`

4. **Deploy:**
   - Netlify will automatically build and deploy your site
   - Your serverless functions will be available at `/.netlify/functions/api/crypto-prices`

> ⚠️ Make sure to remove the placeholder API key (`bf200802-c966-4dff-ac0e-de3f350ef491`) from `functions/api/crypto-prices.js` and use your actual CoinMarketCap API key in Netlify's environment variables.

### Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

### License
This project is licensed under the MIT License.
