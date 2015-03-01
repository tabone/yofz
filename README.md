# Yofz - Yeoman File System Helper
This is a node module which ease the process for a developer to create the directories and templates needed for a Yeoman Generator. This module enables you to create a hierarchical structure of `Directories` and Templates (`Plates`).

## Installation

    npm install --save yofz

## Coding
Once installed require it. This will create a new instance of `Yofz`

    var Yofz = require('Yofz')

A `Yofz` instance will require two things: A root directory and a reference to the Yeoman generator being used. This can either be done when requiring the module:

    module.exports = generator.Base.extend( {
      initializing: function() {
        require('Yofz')(rootDir, this)
      }
    });
    

Or by using the `.setGenerator(..)` and `.setRoot(..)` methods:

    var Yofz = require('Yofz')
    Yofz.setGenerator(this)
    Yofz.setRoot(rootDir)

### Creating Directories

    var dir = Yofz.Directory(name[, opts])

| No. | Type   | Description                |
|-----|--------|----------------------------|
|  1  | String | The name of the directory. |
|  2  | JSON   | Configuration.             |

Inside the `Configuration` object one can enter the following:

| No. | Name     | Type    | Description                |
|-----|----------|---------|----------------------------|
|  1  | children | Array or Asset   | Child or children assets.              |
|  2  | write    | Boolean | True if the template file should be written, false otherwise. |

### Creating Templates

    var index = Yofz.Plate(name[,opts])

| No. | Type    | Description                                                   |
|-----|---------|---------------------------------------------------------------|
|  1  | String  | The name of the template.                                     |
|  2  | JSON    | Configuration.                                                |

Inside the `Configuration` object one can enter the following:

| No. | Name     | Type    | Description                |
|-----|----------|---------|----------------------------|
|  1  | context  | JSON    | Template context object.              |
|  2  | write    | Boolean | True if the template file should be written, false otherwise. |

### Appending Files and Directories inside other Directories

    var root      = Yofz.Directory('root')
    var dist      = Yofz.Directory('dist')
    var index     = Yofz.Plate('index.js', { 'context': {'title': 'Yofz'}
                                           , 'write': true
                                           })
    dist.contains(index)
    root.contains(root)
    

### Build It

    Yofz.build()
