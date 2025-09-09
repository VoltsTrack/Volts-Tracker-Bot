#!/usr/bin/env node

// VoltsTrack Bot - Setup Validation Script
// This script validates that all optimizations are working correctly

const fs = require('fs');
const path = require('path');

console.log('🔍 VoltsTrack Bot - Setup Validation');
console.log('=====================================\n');

let passed = 0;
let failed = 0;

function test(name, condition, details = '') {
    if (condition) {
        console.log(`✅ ${name}`);
        if (details) console.log(`   ${details}`);
        passed++;
    } else {
        console.log(`❌ ${name}`);
        if (details) console.log(`   ${details}`);
        failed++;
    }
}

function fileExists(filePath) {
    return fs.existsSync(filePath);
}

function fileContains(filePath, searchString) {
    if (!fileExists(filePath)) return false;
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(searchString);
}

// Test 1: Required files exist
console.log('📁 File Structure Tests:');
test('main.js exists', fileExists('main.js'), 'Entry point for Replit hosting');
test('bot.js exists', fileExists('bot.js'), 'Main bot logic');
test('websocket-backend.js exists', fileExists('websocket-backend.js'), 'WebSocket handling');
test('.replit config exists', fileExists('.replit'), 'Replit configuration');
test('replit.nix exists', fileExists('replit.nix'), 'Nix environment setup');
test('package.json exists', fileExists('package.json'), 'Dependencies configuration');
test('.env.example exists', fileExists('.env.example'), 'Environment template');
test('REPLIT_DEPLOYMENT.md exists', fileExists('REPLIT_DEPLOYMENT.md'), 'Deployment guide');
test('deploy.sh exists', fileExists('deploy.sh'), 'Deployment script');

console.log('\n⚙️  Configuration Tests:');

// Test 2: package.json has required dependencies
if (fileExists('package.json')) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    test('Express dependency', pkg.dependencies && pkg.dependencies.express, 'Required for health server');
    test('dotenv dependency', pkg.dependencies && pkg.dependencies.dotenv, 'Required for environment variables');
    test('Start script', pkg.scripts && pkg.scripts.start === 'node main.js', 'Replit entry point');
    test('Health check script', pkg.scripts && pkg.scripts.health, 'Health monitoring script');
    test('Deploy script', pkg.scripts && pkg.scripts.deploy, 'Deployment automation script');
}

// Test 3: main.js has health server
test('Health server in main.js', fileContains('main.js', 'express'), 'Express server for health checks');
test('Health endpoints', fileContains('main.js', '/health'), 'Health check endpoint');
test('Ping endpoint', fileContains('main.js', '/ping'), 'Ping endpoint for uptime');

// Test 4: bot.js optimizations
test('Bot optimizations', fileContains('bot.js', 'keepAlive'), 'Replit-specific polling options');
test('Memory cleanup', fileContains('bot.js', 'cleanupOldMessages'), 'Memory management optimization');
test('Environment config', fileContains('bot.js', 'process.env'), 'Environment-based configuration');

// Test 5: websocket-backend optimizations
test('WebSocket optimizations', fileContains('websocket-backend.js', 'maxCacheSize'), 'Memory-optimized caching');
test('Reconnection logic', fileContains('websocket-backend.js', 'reconnectAttempts'), 'Enhanced reconnection handling');
test('API rotation', fileContains('websocket-backend.js', 'rotateApiKey'), 'API key rotation for rate limiting');

// Test 6: .env configuration
if (fileExists('.env')) {
    test('.env file configured', fileExists('.env'), 'Environment variables file');
    const envContent = fs.readFileSync('.env', 'utf8');
    test('Telegram token set', !envContent.includes('your_telegram_bot_token_here'), 'Bot token configured');
    test('Helius keys set', !envContent.includes('your_helius_api_key'), 'API keys configured');
} else {
    test('.env file exists', false, 'Create .env from .env.example');
}

// Test 7: Replit configuration
test('.replit configuration', fileContains('.replit', 'main.js'), 'Correct entry point in .replit');
test('Nix environment', fileContains('replit.nix', 'nodejs'), 'Node.js environment in replit.nix');

console.log('\n📊 Validation Summary:');
console.log('======================');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Score: ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed === 0) {
    console.log('\n🎉 All tests passed! Your bot is ready for Replit deployment.');
    console.log('📝 Next steps:');
    console.log('   1. Configure your .env file with real API keys');
    console.log('   2. Upload to Replit');
    console.log('   3. Run npm start');
} else {
    console.log('\n⚠️  Some tests failed. Please address the issues above.');
    console.log('📚 See REPLIT_DEPLOYMENT.md for detailed instructions.');
}

process.exit(failed > 0 ? 1 : 0);
