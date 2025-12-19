import { NextRequest } from 'next/server';

// Simple token generation (in production, use a proper JWT library)
function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) + 
         Date.now().toString(36);
}

// Simple user storage (in production, use a database)
// For now, we'll use a simple in-memory store
// In production, replace with database
interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

// In-memory user store (replace with database in production)
const users = new Map<string, User>();
const tokens = new Map<string, string>(); // token -> userId

export async function createUser(email: string, password: string, name?: string): Promise<{ user: User; token: string }> {
  // Check if user already exists
  for (const [id, user] of users.entries()) {
    if (user.email.toLowerCase() === email.toLowerCase()) {
      throw new Error('User already exists');
    }
  }

  // In production, hash the password properly
  // For now, we'll just store it (NOT SECURE - replace with bcrypt)
  const userId = generateToken();
  const user: User = {
    id: userId,
    email: email.toLowerCase(),
    name: name || email.split('@')[0],
    createdAt: new Date(),
  };

  users.set(userId, user);
  
  // Generate auth token
  const token = generateToken();
  tokens.set(token, userId);

  return { user, token };
}

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
  // Find user by email
  let foundUser: User | null = null;
  for (const [id, user] of users.entries()) {
    if (user.email.toLowerCase() === email.toLowerCase()) {
      foundUser = user;
      break;
    }
  }

  if (!foundUser) {
    throw new Error('Invalid email or password');
  }

  // In production, verify password hash
  // For now, we'll accept any password (NOT SECURE - implement proper auth)

  // Generate new token
  const token = generateToken();
  tokens.set(token, foundUser.id);

  return { user: foundUser, token };
}

export async function getUserFromToken(token: string): Promise<User | null> {
  const userId = tokens.get(token);
  if (!userId) return null;
  
  return users.get(userId) || null;
}

export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  // Check cookie from request
  const cookie = request.cookies.get('auth-token');
  if (!cookie) return null;

  const token = cookie.value;
  if (!token) return null;

  return getUserFromToken(token);
}

export function setAuthCookie(token: string): void {
  // This will be called from API route
  // In API routes, use response.cookies.set()
}

export function clearAuthCookie(): void {
  // This will be called from API route
  // In API routes, use response.cookies.delete()
}

