# HW-Tracker 2026

A real-time hardware price tracker dashboard built for the 2026 market context (RTX 50-series, DDR5 shortages, Gen5 SSDs).

## Tech Stack

- **Framework:** React + Vite (Adapted from Next.js for this environment)
- **Styling:** Tailwind CSS (Dark Mode optimized)
- **Charts:** Recharts
- **Icons:** Lucide-React

## Deployment Instructions

### 1. Push to GitHub

1.  Initialize a git repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Link and push:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/hw-tracker-2026.git
    git branch -M main
    git push -u origin main
    ```

### 2. Deploy to Netlify

1.  Log in to [Netlify](https://www.netlify.com/).
2.  Click **"Add new site"** > **"Import from Git"**.
3.  Select **GitHub** and authorize.
4.  Choose your `hw-tracker-2026` repository.
5.  **Build Settings:**
    -   **Base directory:** (leave empty)
    -   **Build command:** `npm run build`
    -   **Publish directory:** `dist`
6.  Click **"Deploy site"**.

## Project Structure

-   `/src/data/prices.json`: Mock database with 2026 market data.
-   `/src/components`: UI components (Charts, Tables, Cards).
-   `/src/App.tsx`: Main dashboard layout.

## 2026 Market Context

This tracker reflects the current "AI Memory Squeeze" and GPU inflation:
-   **RTX 5090:** ~$2,150 (High demand)
-   **DDR5 RAM:** Prices up ~300% due to HBM3e production shift.
-   **Gen5 SSDs:** +20% surcharge due to NAND shortages.
