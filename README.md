# Solana Wallet Tracker Bot

A professional Telegram bot for real-time tracking of Solana wallet transactions with advanced filtering and notification systems.

## Features

- **Real-time Transaction Monitoring**: Track Solana wallet activities instantly using WebSocket connections
- **Advanced Filtering**: Smart transaction filters to reduce noise and focus on relevant trades
- **Multi-Wallet Support**: Track up to 3 wallets simultaneously per user
- **Professional Analytics**: Detailed transaction analysis with token information and SOL amounts
- **Rate Limiting**: Intelligent API key rotation to prevent rate limiting
- **Auto-cleanup**: Automatic resource management during inactivity periods
- **Enhanced Transaction Data**: Integration with Helius API for comprehensive transaction details

## Architecture

### Core Components

- **Telegram Bot Interface**: User-friendly command system with inline keyboards
- **WebSocket Backend**: Real-time connection to Solana network via Helius
- **Transaction Processor**: Advanced transaction analysis and filtering
- **Logging System**: Comprehensive logging with different severity levels
- **Cache Management**: Efficient token information caching

### Technology Stack

- **Node.js**: Runtime environment
- **node-telegram-bot-api**: Telegram Bot API wrapper
- **WebSocket**: Real-time data streaming
- **Axios**: HTTP client for API requests
- **Helius API**: Solana blockchain data provider

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Telegram Bot Token from [@BotFather](https://t.me/botfather)
- Helius API keys for Solana data access

### Setup
1. Clone the repository:

```bash
git clone https://github.com/VoltsTrack/Volts-Tracker-Bot.git
cd Volts-Tracker-Bot
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` file with your credentials:
```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
HELIUS_API_KEYS=key1,key2,key3,key4,key5
LOG_LEVEL=INFO
```

5. Start the bot:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Usage

### Basic Commands

- `/start` - Initialize the bot and show main menu
- `/track <wallet_address>` - Start tracking a Solana wallet
- `/untrack <wallet_address>` - Stop tracking a wallet
- `/list` - Display all tracked wallets
- `/status` - Check bot connection status
- `/clear` - Clear bot messages from chat
- `/help` - Display help information

### Advanced Features

- `/settings` - Access advanced technical configuration
- `/signals` - Configure AI-powered trading signals (demo feature)

### Example Usage

```
/track 5t2UrDiTe8wJH8SFmWFK6V5u2PZ6wjPrNN57VvGRCC7P
```

This will start monitoring the specified wallet and send notifications for:
- Token purchases and sales
- SOL amounts involved in transactions
- Transaction signatures for blockchain verification
- Direct links to Solscan for detailed analysis

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token | Required |
| `HELIUS_API_KEYS` | Comma-separated list of Helius API keys | Required |
| `LOG_LEVEL` | Logging level (ERROR, WARN, INFO, DEBUG) | INFO |
| `INACTIVITY_LIMIT` | Auto-cleanup timeout in milliseconds | 300000 |
| `MAX_WALLETS_PER_USER` | Maximum wallets per user | 3 |

### Advanced Settings

The bot includes professional-grade configuration options accessible via `/settings`:
- Latency optimization levels
- Precision filtering thresholds
- WebSocket buffer sizes
- Analytics depth configurations
- Risk calibration parameters

## API Integration

### Helius API

The bot uses Helius API for:
- Enhanced transaction data
- Token metadata retrieval
- Real-time WebSocket connections
- Asset information batching

API key rotation ensures reliable service and prevents rate limiting.

## Development

### Project Structure

```
├── bot.js                 # Main bot application
├── websocket-backend.js   # WebSocket connection handler
├── utils/
│   └── Logger.js         # Logging system
├── package.json          # Project configuration
└── README.md            # This file
```

### Code Quality

- ES6+ JavaScript features
- Error handling and recovery
- Resource management
- Rate limiting compliance
- Memory optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security

- API keys are stored in environment variables
- No sensitive data is logged
- Rate limiting prevents API abuse
- Auto-cleanup prevents resource leaks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This bot is for educational and informational purposes only. It provides transaction monitoring capabilities but should not be used as the sole basis for trading decisions. Always conduct your own research and consider your risk tolerance when trading cryptocurrencies.

## Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed information
3. Include log outputs and error messages when applicable

## Roadmap

- Database integration for persistent storage
- Advanced analytics dashboard
- Multiple exchange support
- Portfolio tracking features
- Mobile app companion
