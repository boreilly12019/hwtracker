import { schedule } from '@netlify/functions';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Mock database (in a real app, use Supabase/Firebase/MongoDB)
// Since serverless functions cannot write to the file system persistently,
// this variable is reset on every invocation.
let pricesData = [
  {
    id: "gpu-1",
    name: "Nvidia RTX 5090 FE",
    category: "GPU",
    currentPrice: 3899,
    status: "Out of Stock",
    history: [
      { month: "Oct 25", price: 2199 },
      { month: "Nov 25", price: 2499 },
      { month: "Dec 25", price: 2899 },
      { month: "Jan 26", price: 3450 },
      { month: "Feb 26", price: 3899 }
    ]
  },
  {
    id: "gpu-2",
    name: "AMD RX 7900 XTX",
    category: "GPU",
    currentPrice: 1450,
    status: "In Stock",
    history: [
      { month: "Oct 25", price: 999 },
      { month: "Nov 25", price: 1099 },
      { month: "Dec 25", price: 1250 },
      { month: "Jan 26", price: 1350 },
      { month: "Feb 26", price: 1450 }
    ]
  },
  // ... (other products would be here)
];

// Function to simulate scraping a retailer site
async function scrapePrice(productName: string): Promise<number | null> {
  try {
    // In a real scenario, you would fetch a URL:
    // const { data } = await axios.get(`https://www.example.com/search?q=${encodeURIComponent(productName)}`);
    // const $ = cheerio.load(data);
    // const priceText = $('.product-price').first().text();
    // return parseFloat(priceText.replace(/[^0-9.]/g, ''));

    // SIMULATION for 2026 Hardware (since these products don't exist yet):
    // Generate a random price fluctuation between -5% and +15% based on "market volatility"
    const basePrice = 3800; // Mock base price (updated for crisis)
    const volatility = Math.random() * 0.2 - 0.05; // -5% to +15%
    const newPrice = Math.round(basePrice * (1 + volatility));
    
    console.log(`[SCRAPER] Fetched live price for ${productName}: $${newPrice}`);
    return newPrice;
  } catch (error) {
    console.error(`[SCRAPER] Failed to fetch price for ${productName}:`, error);
    return null;
  }
}

// The scheduled function handler
const handler = schedule('0 0 * * 0', async (event) => {
  console.log("[CRON] Starting weekly price update...");

  const updates = [];

  for (const product of pricesData) {
    const newPrice = await scrapePrice(product.name);
    
    if (newPrice && newPrice !== product.currentPrice) {
      // Calculate trend
      const oldPrice = product.currentPrice;
      const trend = ((newPrice - oldPrice) / oldPrice) * 100;
      
      // Update the product (in memory)
      product.currentPrice = newPrice;
      product.history.push({
        month: new Date().toLocaleString('default', { month: 'short', year: '2-digit' }),
        price: newPrice
      });

      updates.push({
        name: product.name,
        oldPrice,
        newPrice,
        trend: `${trend > 0 ? '+' : ''}${trend.toFixed(1)}%`
      });
    }
  }

  // In a real app, you would save 'pricesData' to a database here.
  // Example: await supabase.from('products').upsert(pricesData);
  
  console.log("[CRON] Weekly update complete. Changes:", JSON.stringify(updates, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Weekly price update completed successfully",
      updates
    }),
  };
});

export { handler };
