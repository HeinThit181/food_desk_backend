import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const body = await request.json();
        const order = await Order.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        if (mongoose.models.Payment) {
            const Payment = mongoose.models.Payment;
            await Payment.deleteMany({ orderId: id });
        }

        return NextResponse.json({ message: 'Order deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
