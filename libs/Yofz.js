var Asset = require('./Asset')
  , Directory = require('./Directory')
  , Plate = require('./Plate')
  , fs = require('fs')

/**
 * Object used to create a Yofz instance.
 * @param {Yeoman}      gen   The Yeoman Generator being used.
 * @param {Directory}   root  Root Directory.
 */
var Yofz = function(gen, root) {
  if(!(this instanceof Yofz)) {
    return new Yofz(gen, root);
  } else {
    this.gen = gen
    this.root = (root instanceof Asset) ? root : undefined
  }
}

/**
 * This method is used to set the root directory.
 * @param {Directory} root The root directory which Yofz will start traversing from.
 */
Yofz.prototype.setRoot = function(root) {
  if(root instanceof Directory) {
    this.root = root
  }
}

/**
 * Method used to set the Yeoman Generator
 * @param {Generator} gen The Yeoman Generator
 */
Yofz.prototype.setGenerator = function(gen) {
  this.gen = gen
}

/**
 * Recursive method used to traverse the directories to create the App Structure
 * @param  {Directory}  dir  The directory being traversed
 * @param  {String}     path The path.
 * @return {Yofz}      The instance itself.
 */
Yofz.prototype.build = function(dir, path) {
  dir = (dir !== undefined) ? dir : this.root
  path = (path !== undefined) ? path : ''


  for(var index in dir.children) {
      var asset = dir.children[index]
      var assetPath = path + asset.name

      if(asset.write){
        if(asset instanceof Directory) {
          fs.mkdirSync(this.gen.destinationPath(assetPath))
          this.build(asset, assetPath)
        } else if(asset instanceof Plate) {
          this.gen.fs.copyTpl ( this.gen.templatePath(assetPath)
                              , this.gen.destinationPath(assetPath)
                              , asset.context
                              )
        }
      }
    }
    
    return this
}

/**
 * Method which invokes the Directory constructor and return a new instance of Directory.
 * @param {String}  name      The name of the directory.
 * @param {JSON}      opts      Configuration object.
 */
Yofz.prototype.Directory = function(name, opts) {
  return new Directory(name, opts)
}

/**
 * Method which invokes the Plate constructor and return a new instance of Plate
 * @param {String}    name      Then name of the file.
 * @param {JSON}      opts      Configuration object.
 */
Yofz.prototype.Plate = function(name, opts) {
  return new Plate(name, opts)
}

module.exports = Yofz