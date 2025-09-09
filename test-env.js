#!/usr/bin/env node

/**
 * Test script to verify environment variable configuration
 * Run this before starting the bot to ensure all required variables are set
 */

require('dotenv').config();

function testEnvironmentVariables() {
    console.log('🧪 Testing Environment Variable Configuration...\n');

    const requiredVars = {
        'TELEGRAM_BOT_TOKEN': process.env.TELEGRAM_BOT_TOKEN,
        'HELIUS_API_KEYS': process.env.HELIUS_API_KEYS
    };

    const optionalVars = {
        'LOG_LEVEL': process.env.LOG_LEVEL || 'INFO',
        'INACTIVITY_LIMIT': process.env.INACTIVITY_LIMIT || '300000',
        'MAX_WALLETS_PER_USER': process.env.MAX_WALLETS_PER_USER || '3',
        'SOLANA_NETWORK': process.env.SOLANA_NETWORK || 'mainnet',
        'API_ROTATION_INTERVAL': process.env.API_ROTATION_INTERVAL || '900000',
        'MAX_CALLS_PER_ROTATION': process.env.MAX_CALLS_PER_ROTATION || '100',
        'RATE_LIMIT_DELAY': process.env.RATE_LIMIT_DELAY || '1200',
        'CACHE_EXPIRY': process.env.CACHE_EXPIRY || '300000',
        'RECONNECT_ATTEMPTS': process.env.RECONNECT_ATTEMPTS || '5',
        'RECONNECT_DELAY': process.env.RECONNECT_DELAY || '1000'
    };

    let hasErrors = false;

    // Test required variables
    console.log('📋 Required Environment Variables:');
    for (const [key, value] of Object.entries(requiredVars)) {
        if (!value) {
            console.log(`❌ ${key}: NOT SET (REQUIRED)`);
            hasErrors = true;
        } else {
            // Mask sensitive values
            const maskedValue = key.includes('TOKEN') || key.includes('KEY') 
                ? value.substring(0, 8) + '...' 
                : value;
            console.log(`✅ ${key}: ${maskedValue}`);
        }
    }

    // Test Helius API keys format
    if (requiredVars.HELIUS_API_KEYS) {
        console.log('\n🔑 Helius API Keys Analysis:');
        const apiKeys = requiredVars.HELIUS_API_KEYS.split(',').map(key => key.trim());
        console.log(`   Keys count: ${apiKeys.length}`);
        
        apiKeys.forEach((key, index) => {
            if (!key || key.length < 32) {
                console.log(`   ❌ Key ${index + 1}: Invalid format (${key.substring(0, 8)}...)`);
                hasErrors = true;
            } else {
                console.log(`   ✅ Key ${index + 1}: Valid format (${key.substring(0, 8)}...)`);
            }
        });
    }

    // Test optional variables
    console.log('\n📋 Optional Environment Variables (with defaults):');
    for (const [key, value] of Object.entries(optionalVars)) {
        const envValue = process.env[key];
        const status = envValue ? '✅ (set)' : '⚙️ (default)';
        console.log(`${status} ${key}: ${value}`);
    }

    console.log('\n' + '='.repeat(50));
    
    if (hasErrors) {
        console.log('❌ Configuration has errors. Please check your .env file.');
        console.log('💡 Copy .env.example to .env and fill in the required values.');
        process.exit(1);
    } else {
        console.log('✅ Environment configuration is valid!');
        console.log('🚀 You can now safely start the bot with: npm start');
    }
}

// Run the test
testEnvironmentVariables();
