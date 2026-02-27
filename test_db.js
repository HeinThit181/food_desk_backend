import mongoose from 'mongoose';

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/food_desk');
  const db = mongoose.connection.db;
  const orders = await db.collection('orders').find({}).limit(3).toArray();
  console.log("Samples:", orders.map(o => ({ _id: o._id, type: typeof o._id, isObjectId: o._id instanceof mongoose.Types.ObjectId })));
  process.exit(0);
}
connect().catch(console.error);
