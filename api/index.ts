import express from 'express';

// Re-export or adapt the Express server for Vercel Serverless Function
// Vercel auto-routes /api/* to files in /api or /server
import app from '../server';

export default app;
