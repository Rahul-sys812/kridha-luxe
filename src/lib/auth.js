import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { connectDB } from './mongodb';
import User from './models/User';

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

// Middleware helper — call inside API routes to get current user
export async function getAuthUser(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    await connectDB();
    const user = await User.findById(decoded.id).select('-password');
    return user || null;
  } catch {
    return null;
  }
}

export function requireAuth(handler) {
  return async (req, context) => {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    req.user = user;
    return handler(req, context);
  };
}
