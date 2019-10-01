# img-clipboard

A cross platform Node.js utility to copy images to clipboard.

## Installation

`npm install --save img-clipboard`

## Usage

You can use the copyImg function to copy either an image `Buffer`, or a file path `String`.

```javascript
const { copyImg } = require('img-clipboard');

copyImg(Buffer.from(imageData, 'base64'));
```

copyImg returns a `Promise` of `[err, stdout, stderr]`.

## Linux use

In order for this utility to work on Linux, some external dependencies are required. `xclip` is required for X11 systems and `wl-clipboard` is required for Wayland systems.

They can generally be installed with your distro's package manager.

```sh
# Ubuntu / Debian
sudo apt install xclip
sudo apt install wl-clipboard

# Arch / Manjaro
pacman -S xclip
pacman -S wl-clipboard
```

## Package missing logging

There are a couple of extra exports to help you log errors when the required packages are missing on Linux. Here's an example of how to use them:

```javascript
const { copyImg, ErrorCodes, isWayland } = require('img-clipboard');

const copyToClipboard = async imageData => {
  const [err, stdout, stderr] = await copyImg(Buffer.from(imageData, 'base64'));
  if (err) {
    if (err.code === ErrorCodes.COMMAND_NOT_FOUND && process.platform === 'linux')
      console.err(isWayland() ? 'wl-clipboard' : 'xclip' + ' is not installed');
    else console.err(stdout + stderr);
  }
};
```
