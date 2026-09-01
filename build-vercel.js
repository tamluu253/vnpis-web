const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== VNPIS Monorepo Build Script Starting ===');
const rootDir = __dirname;
const webDir = path.join(rootDir, 'vnpis-web');

console.log('Building inside vnpis-web...');
execSync('npx next build', { cwd: webDir, stdio: 'inherit' });

console.log('Copying build artifacts to root for Vercel deployment...');
const rootNext = path.join(rootDir, '.next');
const rootPublic = path.join(rootDir, 'public');

if (fs.existsSync(rootNext)) fs.rmSync(rootNext, { recursive: true, force: true });
if (fs.existsSync(rootPublic)) fs.rmSync(rootPublic, { recursive: true, force: true });

fs.cpSync(path.join(webDir, '.next'), rootNext, { recursive: true });
fs.cpSync(path.join(webDir, 'public'), rootPublic, { recursive: true });

console.log('=== VNPIS Monorepo Build Complete Successfully ===');
