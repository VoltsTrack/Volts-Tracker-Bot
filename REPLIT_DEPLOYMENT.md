# 🚀 VoltsTrack Bot - Replit Deployment Guide

This guide will help you deploy your VoltsTrack Telegram bot on Replit for 24/7 hosting.

## 📋 Prerequisites

Before deployment, ensure you have:
- A Telegram bot token from [@BotFather](https://t.me/BotFather)
- Helius API keys from [Helius.xyz](https://helius.xyz/)
- A Replit account (free or paid)

## 🔧 Quick Setup

### 1. Import to Replit

1. Create a new Repl on Replit
2. Choose "Import from GitHub" or upload your project files
3. Ensure all files from this project are uploaded

### 2. Environment Configuration

Create or update the `.env` file with your credentials:

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# Helius API Keys (comma-separated for rotation)
HELIUS_API_KEYS=your_helius_api_key_1,your_helius_api_key_2,your_helius_api_key_3

# Bot Configuration (Optional - defaults provided)
LOG_LEVEL=INFO
INACTIVITY_LIMIT=300000
MAX_WALLETS_PER_USER=3

# Network Configuration
SOLANA_NETWORK=mainnet
API_ROTATION_INTERVAL=900000
MAX_CALLS_PER_ROTATION=100

# Rate Limiting
RATE_LIMIT_DELAY=1200
CACHE_EXPIRY=300000

# WebSocket Configuration
RECONNECT_ATTEMPTS=5
RECONNECT_DELAY=1000
```

### 3. Install Dependencies

Run in the Replit shell:
```bash
npm install
```

### 4. Start the Bot

Click the "Run" button or use:
```bash
npm start
```

## 🏗️ File Structure

```
├── .replit              # Replit configuration
├── replit.nix           # Nix environment setup
├── main.js              # Entry point with health checks
├── bot.js               # Main bot logic (optimized)
├── websocket-backend.js # WebSocket handling (optimized)
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables
└── REPLIT_DEPLOYMENT.md # This guide
```

## ⚙️ Replit-Specific Optimizations

### Express Health Server
- Runs on port 3000 for Replit's uptime monitoring
- Provides `/health` and `/ping` endpoints
- Keeps the Repl alive with periodic pings

### Resource Management
- Memory-optimized token caching
- Efficient WebSocket reconnection logic
- API key rotation to respect rate limits
- Automatic cleanup of old data

### Cloud Hosting Features
- Environment-based configuration
- Graceful shutdown handling
- IPv4-only networking for Replit compatibility
- Enhanced error handling and logging

## 🔍 Monitoring & Debugging

### Health Check Endpoints

- **GET /health** - Bot status and uptime
- **GET /ping** - Simple alive check  
- **GET /** - Welcome message with bot info

### Log Monitoring

Watch the console for:
- ✅ Bot initialization success
- 🌐 Health server status
- 🤖 WebSocket connection status
- 💬 Transaction monitoring logs
- ⚠️ Any error messages

### Common Issues

1. **401 Unauthorized**: Check your Telegram bot token
2. **API Errors**: Verify Helius API keys are valid
3. **WebSocket Issues**: Check network connectivity
4. **Memory Errors**: Review tracked wallet limits

## 🎯 Production Configuration

### Recommended Settings

```bash
# High-performance settings
API_ROTATION_INTERVAL=600000    # 10 minutes
MAX_CALLS_PER_ROTATION=150      # More calls per key
RATE_LIMIT_DELAY=800           # Faster rate limiting
CACHE_EXPIRY=600000            # 10 minute cache
RECONNECT_ATTEMPTS=10          # More retry attempts
```

### Performance Tips

1. **Use Multiple API Keys**: Add 3-5 Helius API keys for better rotation
2. **Monitor Resource Usage**: Keep track of memory and CPU usage
3. **Regular Restarts**: Set up automatic restarts if needed
4. **Uptime Monitoring**: Use Replit's built-in monitoring

## 🆘 Support & Troubleshooting

### Bot Commands for Testing
- `/start` - Initialize the bot
- `/track <wallet_address>` - Start tracking a wallet
- `/untrack <wallet_address>` - Stop tracking
- `/list` - Show tracked wallets
- `/help` - Show all commands

### Debugging Commands
```bash
# Check bot process
npm run debug

# View logs in real-time  
npm run logs

# Test health endpoints
curl http://localhost:3000/health
```

## 🔐 Security Best Practices

1. **Never commit `.env`** - Keep credentials secure
2. **Use environment variables** - Don't hardcode tokens
3. **Rotate API keys regularly** - Update Helius keys monthly
4. **Monitor usage** - Watch for unusual API consumption
5. **Limit bot permissions** - Only grant necessary Telegram permissions

## 🚀 Going Live

1. **Test thoroughly** - Verify all commands work
2. **Set up monitoring** - Use health endpoints
3. **Configure uptime checks** - Set up external pings if needed
4. **Document wallet limits** - Inform users of tracking limits
5. **Plan for scaling** - Monitor resource usage trends

Your VoltsTrack bot is now ready for 24/7 operation on Replit! 

For additional support or feature requests, check the project documentation or contact the development team.
