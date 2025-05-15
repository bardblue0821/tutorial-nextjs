import { NextResponse } from 'next/server';
import connectDB from '@/utils/database';
import { UserModel } from '@/utils/schemaModels';
import { SignJWT } from 'jose';

export async function POST(request) {
    const reqBody = await request.json();
    try {
        await connectDB();
        const savedUserData = await UserModel.findOne({email: reqBody.email});
        console.log('Saved User Data:', savedUserData);
        if (savedUserData) {
            if (reqBody.password === savedUserData.password) {
                const secretKey = new TextEncoder().encode('next-market-app-book');
                const payload = {
                    email: reqBody.email,
                }
                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: 'HS256' })
                    .setExpirationTime('2h')
                    .sign(secretKey);
                console.log('Generated JWT:', token);
                return NextResponse.json({ message: 'Login successful', token: token });
            } else {
                console.log('Incorrect password');
                return NextResponse.json({ message: 'Incorrect password' });
            }
        } else {
            return NextResponse.json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({ message: 'Database connection error' });
    }
}
