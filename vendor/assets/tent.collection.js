(function () {
  Tent.Collection = Backbone.Collection.extend({
    serialize: function () {
      return JSON.stringify(this.toJSON());
    }
  });
})();
