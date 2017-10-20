# Component Generator CLI

### STATUS: Not ready for use.

> Purpose of this is to create scaffolding for multiple components easily

## Getting Started
### Install
```
npm i -g component-generator-cli
```

### Use
`compgen` starts the component-generator


#### Commands

##### Summary
| Available | Command | Options | Example |
|:----------|:--------|:--------|:--------|
| N | `add` | [--preview/--p] , [--config/--c]  | compgen~$ `add Com Pon Ents --config path/to/my/config.json`
| N | `fill-current` | [--overwrite/--o] | compgen~$ `fill-current --o` |
| N | `undo` | | compgen~$ `undo` |


----
##### Detailed

###### `compgen~$ add [...components to add] --preview --config /path/to/config.json`
>  `add` → Generate variadic number of components

  | Option | Alias | Arguments | Description |
  |:-------|:------|:----------|:------------|
  | --preview | --p | N/A | See changes before executing |
  | --config | --c | /path/to/config.json → Overwrite [defaults](https://github.com/servexyz/component-generator-lib/blob/master/format.json) with your own [custom config](./docs/config_template.json) | Specify your own config for file names, extensions, code-templates, ignored directories and more |


###### `compgen~$ fill-current`
> `fill-current`→ Fill current directories with template files (useful if you've already `mkdir`'d all of your components)

  | Option | Alias | Description |
  |:-------|:------|:------------|
  | --overwrite | --o | Replaces matching files with new content


###### `compgen~$ undo`
> `undo` → Revert all previous actions

  | Option | Alias | Description |
  |:-------|:------|:------------|
  | N/A |  | |

----

#### Config

##### Resources
* [Configuration format](https://github.com/servexyz/component-generator-lib/blob/master/format.json) - Defaults used by the component generator
* [Configuration template](./docs/config_template.json) - Modify for your own use


## Example

<REPLACE EXAMPLE WITH GIF>
