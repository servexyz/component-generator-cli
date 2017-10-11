# Component Generator CLI

> Purpose of this is to create scaffolding for multiple components easily

## Overview
`Input`:
cgc componentName componentNamely componentNameth

`Output`:
```
./componentName
-- componentName.js
-- componentName.test.js
-- index.js
./componentNamely
-- componentNamely.js
-- componentNamely.test.js
-- index.js
./componentNameth
-- componentNameth.js
-- componentNameth.js
-- index.js
```

## Core functionality:
### 1. Create directories
```js
var fs = require('fs');
var dir = './tmp';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
```

### 2. Create files
```js

```

### 3. Write to files
```js

```

### 4. Spawn child process to handle each
```js

```
