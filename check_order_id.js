import mongoose from 'mongoose';

async function check() {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    console.log("Connected to DB:", db.databaseName);
    const orders = await mongoose.connection.collection('orders').find({}).limit(5).toArray();
    console.log("Orders count:", orders.length);
    for (const o of orders) {
        console.log("Order ID:", o._id, "Type:", typeof o._id, "Constructor:", o._id?.constructor?.name);
    }
    process.exit(0);
}
check();
