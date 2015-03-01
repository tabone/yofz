var Asset = require('./Asset')

/**
 * This object represents a file.
 * @param {String}    name      Then name of the file.
 * @param {JSON}      opts      Configuration object.
 */
var Plate = function(name, opts) {
  opts = (opts !== undefined) ? opts : {}
  if(!(this instanceof Plate)) {
    return new Plate(name, opts)
  } else {
    Asset.call(this, name, opts.write)
    this.context = (opts.context !== undefined) ? opts.context : {}
  }
}

/**
 * Inheriting from Asset object.
 */
Plate.prototype = Object.create(Asset.prototype)
Plate.prototype.constructor = Object.create(Plate)

/**
 * Exporting Plate as a module
 * @type {Plate}
 */
module.exports = Plate