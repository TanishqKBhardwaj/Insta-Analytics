import { ApifyClient } from "apify-client";
import dotenv from "dotenv";
import { filterInstagramData } from "./dataFilter.js";

dotenv.config();

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

export async function getInstagramData(username,resultsLimit=10) {
  try {
    const input = {
      usernames: [username],
      resultsLimit: resultsLimit
    };

    const run = await client.actor("dSCLg0C3YEZ83HzYX").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    const filtered = filterInstagramData(items);
    return filtered;
  } catch (error) {
    console.error(" Error in getInstagramData:", error.message);
    throw error;
  }
}
