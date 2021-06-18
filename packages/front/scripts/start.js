const { spawn } = require('child_process');

spawn(
  `node ./node_modules/env-cmd/bin/env-cmd.js -f ./.env ./node_modules/@rescripts/cli/bin/rescripts.js start`,
  {
    stdio: 'inherit',
    shell: true
  }
);
