const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const hasFrontendSubdir = fs.existsSync(path.join(process.cwd(), 'frontend'));

  if (hasFrontendSubdir) {
    console.log('▶ [build.cjs] Building from repository root (frontend folder detected)...');
    execSync('npm --prefix frontend run build', { stdio: 'inherit' });

    const srcDist = path.join(process.cwd(), 'frontend', 'dist');
    const destDist = path.join(process.cwd(), 'dist');

    if (fs.existsSync(srcDist)) {
      if (fs.existsSync(destDist)) {
        fs.rmSync(destDist, { recursive: true, force: true });
      }
      fs.cpSync(srcDist, destDist, { recursive: true });
      console.log('✓ [build.cjs] Output available at ./dist and ./frontend/dist');
    }
  } else {
    console.log('▶ [build.cjs] Building from frontend workspace directory...');
    execSync('npx vite build', { stdio: 'inherit' });
    console.log('✓ [build.cjs] Output available at ./dist');
  }
} catch (err) {
  console.error('✗ [build.cjs] Build failed:', err.message);
  process.exit(1);
}
