#!/bin/bash

# VoltsTrack Bot - Replit Deployment Script
# This script helps set up the bot for Replit hosting

echo "🚀 VoltsTrack Bot Deployment Script"
echo "===================================="

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your API keys before running the bot!"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for required environment variables
echo "🔍 Checking environment configuration..."

if [ -f ".env" ]; then
    # Source the .env file to check variables
    source .env
    
    if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ "$TELEGRAM_BOT_TOKEN" == "your_telegram_bot_token_here" ]; then
        echo "❌ TELEGRAM_BOT_TOKEN not configured in .env"
        echo "   Get your token from @BotFather on Telegram"
    else
        echo "✅ Telegram bot token configured"
    fi
    
    if [ -z "$HELIUS_API_KEYS" ] || [[ "$HELIUS_API_KEYS" == *"your_helius_api_key"* ]]; then
        echo "❌ HELIUS_API_KEYS not configured in .env"  
        echo "   Get your API keys from https://helius.xyz/"
    else
        echo "✅ Helius API keys configured"
    fi
fi

# Test health server
echo "🏥 Testing health server setup..."
if [ -f "main.js" ]; then
    echo "✅ Health server entry point found"
else
    echo "❌ main.js not found - health server may not work"
fi

# Check Replit configuration
echo "⚙️  Checking Replit configuration..."
if [ -f ".replit" ] && [ -f "replit.nix" ]; then
    echo "✅ Replit configuration files found"
else
    echo "⚠️  Replit configuration files missing - may need manual setup"
fi

echo ""
echo "📋 Deployment Summary:"
echo "======================"
echo "✅ Dependencies installed"
echo "✅ Configuration files checked"

if [ -f ".env" ]; then
    if [ "$TELEGRAM_BOT_TOKEN" != "your_telegram_bot_token_here" ] && [ "$HELIUS_API_KEYS" != "your_helius_api_key_1,your_helius_api_key_2,your_helius_api_key_3" ]; then
        echo "✅ Environment variables configured"
        echo ""
        echo "🚀 Ready to deploy! Run: npm start"
    else
        echo "❌ Please configure your API keys in .env first"
        echo ""
        echo "📝 Edit .env file with:"
        echo "   - Your Telegram bot token from @BotFather"
        echo "   - Your Helius API keys from https://helius.xyz/"
    fi
else
    echo "❌ .env file missing"
fi

echo ""
echo "📚 For detailed instructions, see REPLIT_DEPLOYMENT.md"
