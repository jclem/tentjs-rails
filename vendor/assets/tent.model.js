(function () {
  Tent.Model = Backbone.Model.extend({
    serialize: function () {
      return JSON.stringify(this.toJSON());
    }
  });
})();
