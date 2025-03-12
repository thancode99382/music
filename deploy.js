/**
 * Simple script to prepare app for deployment
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Clean up any previous builds
console.log('🧹 Cleaning up previous builds...');
try {
  fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });
} catch (err) {
  // Ignore if no dist directory
}

// Run the build
console.log('🏗️ Building for production...');
execSync('npm run build', { stdio: 'inherit' });

// Check if build was successful
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.error('❌ Build failed!');
  process.exit(1);
}

console.log('✅ Build successful!');
console.log('');
console.log('🚀 To deploy to Vercel:');
console.log('1. Run `vercel` from the project root');
console.log('2. Or connect your GitHub repo to Vercel dashboard');
console.log('');
console.log('📝 For manual deployment:');
console.log('1. Upload the contents of the dist folder to your hosting provider');
console.log('2. Ensure all requests are redirected to index.html');
