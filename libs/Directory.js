var Asset = require('./Asset')

/**
 * An object used to represent a directory.
 * @param {String}  name      The name of the directory.
 * @param {JSON}    opts      Configuration object.
 */
var Directory = function(name, opts) {
  opts = (opts !== undefined) ? opts : {}

  if(!(this instanceof Directory)) {
    return new Directory(name, opts)
  } else {
    name = (name[name.length - 1] === "/") ? name : name + "/"
    Asset.call(this, name, opts.write)
    this.children = (opts.children !== undefined &&
        (opts.children instanceof Array || opts.children instanceof Asset)) 
            ? opts.children : []
  }
}

/**
 * Inheriting from Asset object.
 */
Directory.prototype = Object.create(Asset.prototype)
Directory.prototype.constructor = Directory

/**
 * This method is used to include an asset inside a directory.
 * @param  {Asset / Array}  asset     The asset/s which this are inside the directory
 * @param  {Boolean}        replace   If true it will replace the current assets, else it will append.
 */
Directory.prototype.contains = function(asset, replace) {
  replace = (replace !== undefined)

  if(asset instanceof Asset) {
    if(replace){
      this.children = [asset]
    }else{
      this.children.push(asset)
    }
    
  }else if(asset instanceof Array) {
    if(replace){
      for(index in asset){
        if(asset[index] instanceof Asset) {
          this.children.push(asset[index])
        }
      }
    }else{
      this.children = asset
    }
  }
}

/**
 * Exporting Directory as a module.
 * @type {Directory}
 */
module.exports = Directory;