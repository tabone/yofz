/**
 * Object which any asset must inherit from.
 * @param {String} name The name of the Asset
 * @param {Boolean} If true the asset will be written.
 */
var Asset = function(name, write) {
  if(!(this instanceof Asset)) {
    return new Asset(name, write)
  } else {
    this.name = name
    this.write = (write !== undefined) ? write : true
  }
}

/**
 * Exporting Asset as a module
 * @type {Asset}
 */
module.exports = Asset