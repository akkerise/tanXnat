const { spawn } = require('child_process');

// Clean environment to ensure Electron runs (not Node mode)
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;
env.VITE_DEV_SERVER = env.VITE_DEV_SERVER || 'true';

const electronBinary = require('electron'); // path to electron executable
const child = spawn(electronBinary, ['.'], {
  stdio: 'inherit',
  env,
});

child.on('exit', (code) => process.exit(code ?? 0));

