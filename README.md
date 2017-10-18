# Component Generator CLI

> Purpose of this is to create scaffolding for multiple components easily

## Install
```
npm i -g @bubblegum/component-factory-cli
```

## Run
```bash
cgc [...components: Array<string> | string]
```

## Example

**Input**
```bash
cgc abc def
```

**Output**
```
./the-directory-where-cgc-was-executed/
abc/
* index.js
* abc.js
* abc.test.js
def/
* index.js
* abc.js
* abc.test.js
```
