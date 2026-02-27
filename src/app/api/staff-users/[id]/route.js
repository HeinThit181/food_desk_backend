import dbConnect from '@/lib/db';
import StaffUser from '@/models/StaffUser';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const user = await StaffUser.findById(id);
        if (!user) {
            return NextResponse.json({ error: 'StaffUser not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const body = await request.json();
        const user = await StaffUser.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return NextResponse.json({ error: 'StaffUser not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const user = await StaffUser.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json({ error: 'StaffUser not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'StaffUser deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
