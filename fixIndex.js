import fs from "fs";
import mongoose from "mongoose";
import path from "path";

async function run() {
    const envContent = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf-8");
    const match = envContent.match(/MONGODB_URI=(.*)/);
    if (!match) {
        console.log("No MONGODB_URI found in .env.local");
        process.exit(1);
    }

    let uri = match[1].trim();
    if (uri.startsWith('"') && uri.endsWith('"')) {
        uri = uri.slice(1, -1);
    } else if (uri.startsWith("'") && uri.endsWith("'")) {
        uri = uri.slice(1, -1);
    }

    await mongoose.connect(uri);
    try {
        const result = await mongoose.connection.collection("products").dropIndex("id_1");
        console.log("Successfully dropped id_1 index:", result);
    } catch (err) {
        console.log("Error dropping index (might not exist):", err.message);
    }
    process.exit(0);
}

run();
