import dbConnect from '@/lib/db';
import StaffUser from '@/models/StaffUser';
import { NextResponse } from 'next/server';

export async function GET(request) {
    await dbConnect();
    try {
        const users = await StaffUser.find({});
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const user = await StaffUser.create(body);
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
