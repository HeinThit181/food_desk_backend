import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET(request) {
    await dbConnect();
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const order = await Order.create(body);
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
