import mongoose from 'mongoose';
import { ENV } from './env';

export async function connectDB() {
    if (!ENV.DATABASE_URL) {
        throw new Error('DATABASE_URL is required to start the backend');
    }

    await mongoose.connect(ENV.DATABASE_URL);
    console.log('MongoDB connected');
}
