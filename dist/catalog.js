/* vtex.js 0.1.0 */

/**
* h1 Catalog module
*
* Offers convenient methods for using the Checkout API in JS.
 */

(function() {
  var Catalog,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Catalog = (function() {
    var HOST_URL, version;

    HOST_URL = window.location.origin;

    version = '0.1.0';


    /**
    	 * Instantiate the Catalog module.
    	 *
      * h3 Options:
      *
    	 *  - **String** *options.hostURL* (default = `window.location.origin`) the base URL for API calls, without the trailing slash
    	 *  - **Function** *options.ajax* (default = `$.ajax`) an AJAX function that must follow the convention, i.e., accept an object of options such as 'url', 'type' and 'data', and return a promise.
    	 *  - **Function** *options.promise* (default = `$.when`) a promise function that must follow the Promises/A+ specification.
      *
    	 * @param {Object} options options.
    	 * @return {Checkout} instance
    	 * @note hostURL configures a static variable. This means you can't have two different instances looking at different host URLs.
     */

    function Catalog(options) {
      if (options == null) {
        options = {};
      }
      this.getProductWithVariations = __bind(this.getProductWithVariations, this);
      if (options.hostURL) {
        HOST_URL = options.hostURL;
      }
      this.ajax = options.ajax || $.ajax;
      this.promise = options.promise || $.when;
      this.cache = {
        productWithVariations: {}
      };
    }


    /**
    	 * Sends a request to retrieve the orders for a specific orderGroupId.
    	 * @param {String} orderGroupId the ID of the order group.
    	 * @return {Promise} a promise for the orders.
     */

    Catalog.prototype.getProductWithVariations = function(productId) {
      if (this.cache.productWithVariations[productId]) {
        return this.promise(this.cache.productWithVariations[productId]);
      } else {
        return $.when(this.cache.productWithVariations[productId] || $.ajax("" + this.BASE_ENDPOINT + "/products/variations/" + productId)).done((function(_this) {
          return function(response) {
            return _this.cache.productWithVariations[productId] = response;
          };
        })(this));
      }
    };

    Catalog.prototype._getBaseCatalogSystemURL = function() {
      return HOST_URL + '/api/catalog_system/pub';
    };

    return Catalog;

  })();

  window.vtex || (window.vtex = {});

  window.vtex.Catalog = Catalog;

  window.vtex.catalog = new window.vtex.Catalog();

}).call(this);