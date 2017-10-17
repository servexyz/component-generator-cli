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
https://github.com/isaacs/node-touch
[API Usage](https://github.com/isaacs/node-touch#api-usage)

```
var touch = require("touch")
Gives you the following functions:

touch(filePath, options, cb)
touch.sync(filePath, options)
touch.ftouch(fd, options, cb)
touch.ftouchSync(fd, options)
All the options objects are optional.

All the async functions return a Promise. If a callback function is provided, then it's attached to the Promise.
```


### 3. Write to files
```js
var fs = require('fs');
fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
```

More info:
```
Currently there are three ways to write a file:

fs.write(fd, buffer, offset, length, position, callback)

You need to wait for the callback to ensure that the buffer is written to disk. It's not buffered.
fs.writeFile(filePath, data, [encoding], callback)

All data must be stored at the same time; you cannot perform sequential writes.
fs.createWriteStream(path, [options])

Creates a WriteStream, which is convenient because you don't need to wait for a callback. But again, it's not buffered.
```

Getting the proper file:

```

up vote
255
down vote
accepted
process.cwd() returns the current working directory,

i.e. the directory from which you invoked the node command.

__dirname returns the directory name of the directory containing the JavaScript source code file
```
