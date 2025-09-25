import { ApifyClient } from 'apify-client';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Initialize the ApifyClient with API token from .env
const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,  // Make sure you set APIFY_API_TOKEN in .env
});

// Prepare Actor input
const input = {
    usernames: ["hahha"],
};

(async () => {
    try {
        // Run the Actor and wait for it to finish
        const run = await client.actor("dSCLg0C3YEZ83HzYX").call(input);

        // Fetch Actor results from the run's dataset (if any)
        console.log('Fetching results...');
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        // Save results to JSON file
        const fileName = "profile_output2.json";
        fs.writeFileSync(fileName, JSON.stringify(items, null, 2));

        console.log(`✅ Data saved to ${fileName} with ${items.length} records`);
    } catch (error) {
        console.error("❌ Error scraping profile:", error.message);
    }
})();
