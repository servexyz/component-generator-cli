# Component Generator CLI

### STATUS: Not ready for use. Technically works right now, but sloppy experience.

> Purpose of this is to create scaffolding for multiple components easily

## Install
```
npm i -g @bubblegum/component-generator-cli
```

## Run
```bash
cgc  #---> this starts the component-generator-cli
m #----> this is the command to type when you see $component-generator-cli
```

## Example

**Input**
```bash
cgc
m abc def
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
