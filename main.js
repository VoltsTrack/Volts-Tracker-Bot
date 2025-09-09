#!/usr/bin/env node

/**
 * Replit Entry Point for VoltsTrack Telegram Bot
 * Optimized for cloud hosting with health checks and keep-alive mechanisms
 */

const express = require('express');
const path = require('path');

// Initialize Express server for health checks (required for Replit)
const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/', (req, res) => {
  const status = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    service: 'VoltsTrack Telegram Bot',
    version: '1.0.0'
  };
  res.json(status);
});

// Status endpoint for monitoring
app.get('/status', (req, res) => {
  const memUsage = process.memoryUsage();
  const status = {
    status: 'running',
    memory: {
      rss: Math.round(memUsage.rss / 1024 / 1024) + ' MB',
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB',
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
      external: Math.round(memUsage.external / 1024 / 1024) + ' MB'
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };
  res.json(status);
});

// Health check endpoint (alternative path)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Ping endpoint for uptime monitoring
app.get('/ping', (req, res) => {
  res.json({ ping: 'pong', timestamp: new Date().toISOString() });
});

// Start the HTTP server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Health check server running on port ${PORT}`);
  console.log(`🔗 Health check URL: http://localhost:${PORT}`);
  
  // Start the Telegram bot after server is ready
  startTelegramBot();
});

// Keep-alive mechanism for Replit
const keepAlive = () => {
  setInterval(() => {
    // Ping self to keep the service alive on Replit
    if (process.env.REPL_SLUG) {
      const https = require('https');
      const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
      
      https.get(url, (res) => {
        console.log(`🟢 Keep-alive ping: ${res.statusCode}`);
      }).on('error', (err) => {
        console.log(`⚠️ Keep-alive error: ${err.message}`);
      });
    }
  }, 5 * 60 * 1000); // Ping every 5 minutes
};

// Start Telegram bot
function startTelegramBot() {
  try {
    console.log('🤖 Starting VoltsTrack Telegram Bot...');
    
    // Import and start the main bot
    require('./bot.js');
    
    // Start keep-alive after bot initialization
    keepAlive();
    
  } catch (error) {
    console.error('❌ Error starting Telegram bot:', error);
    process.exit(1);
  }
}

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT. Graceful shutdown...');
  server.close(() => {
    console.log('✅ HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM. Graceful shutdown...');
  server.close(() => {
    console.log('✅ HTTP server closed.');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

console.log('🚀 VoltsTrack Bot initializing for Replit hosting...');
