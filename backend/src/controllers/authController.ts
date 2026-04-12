import { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { ENV } from '../config/env';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createAuthToken(userId: string, email: string) {
  return jwt.sign(
    { sub: userId, email },
    ENV.JWT_SECRET,
    { expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  );
}

export async function signUp(req: Request, res: Response) {
  const { fullName, name, email, password } = req.body as {
    fullName?: string;
    name?: string;
    email?: string;
    password?: string;
  };

  const resolvedFullName = (fullName ?? name)?.trim();

  if (!resolvedFullName || !email || !password) {
    return res.status(400).json({ success: false, message: 'fullName, email and password are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName: resolvedFullName,
    email: normalizedEmail,
    password: hashedPassword,
  });

  const token = createAuthToken(user.id, user.email);

  return res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    },
  });
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'email and password are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = createAuthToken(user.id, user.email);

  return res.status(200).json({
    success: true,
    message: 'Sign in successful',
    data: {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    },
  });
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body as { email?: string };

  if (!email) {
    return res.status(400).json({ success: false, message: 'email is required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select('+resetPasswordToken +resetPasswordExpires');

  if (!user) {
    return res.status(200).json({
      success: true,
      message: 'If an account exists with that email, reset instructions have been sent',
    });
  }

  const rawResetToken = crypto.randomBytes(32).toString('hex');
  const hashedResetToken = crypto.createHash('sha256').update(rawResetToken).digest('hex');

  user.resetPasswordToken = hashedResetToken;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60);
  await user.save();

  return res.status(200).json({
    success: true,
    message: 'If an account exists with that email, reset instructions have been sent',
    data: {
      // Keep this for local frontend integration until email provider is wired.
      resetToken: ENV.NODE_ENV === 'production' ? undefined : rawResetToken,
      expiresInMinutes: 60,
    },
  });
}

export async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body as {
    token?: string;
    password?: string;
  };

  if (!token || !password) {
    return res.status(400).json({ success: false, message: 'token and password are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  }).select('+resetPasswordToken +resetPasswordExpires +password');

  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  const authToken = createAuthToken(user.id, user.email);

  return res.status(200).json({
    success: true,
    message: 'Password reset successful',
    data: {
      token: authToken,
    },
  });
}
