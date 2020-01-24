'use strict';

require('./scripts/set-permissions');
const tempWrite = require('temp-write');
const { exec } = require('child_process');

const isWayland = () => process.env.XDG_SESSION_TYPE === 'wayland';

const run = cmd => new Promise(done => exec(cmd, { cwd: __dirname }, (...args) => done(args)));

const copyX11 = file => run(`xclip -sel clip -t image/png -i "${file}"`);

const copyWayland = file => run(`wl-copy < "${file}"`);

const copyLinux = file => (isWayland() ? copyWayland(file) : copyX11(file));

const copyOsx = file => run(`./scripts/osx-copy-image "${file}"`);

const copyWindows = file =>
  run(`powershell.exe -ExecutionPolicy Bypass ./scripts/copy-image.ps1 "${file}"`);

const copyImg = img => {
  const file = Buffer.isBuffer(img) ? tempWrite.sync(img) : img;
  return process.platform === 'win32'
    ? copyWindows(file)
    : process.platform === 'darwin'
    ? copyOsx(file)
    : copyLinux(file);
};

const ErrorCodes = {
  COMMAND_NOT_FOUND: 127
};

module.exports = { copyImg, ErrorCodes, isWayland };
