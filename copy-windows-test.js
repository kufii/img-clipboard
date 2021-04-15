// Not sure if it's the correct way to test this because once the `copy-windows-test.js` location changes, e.g. `tests/copy-windows-test.js`, it won't work, please give it a try before merging.

'use strict';

const { copyImg } = require('./index.js');

copyImg('./transparent.png');
