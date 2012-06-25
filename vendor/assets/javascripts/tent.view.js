(function () {
  Tent.View = Backbone.View.extend({
    bindTo: function (object, event, callback) {
      this._bindings = this._bindings || [];

      object.on(event, callback, this);

      if (!_.contains(this._bindings)) {
        this._bindings.push(object);
      }
    },

    close: function () {
      if (this.beforeClose) {
        this.beforeClose();
      }

      this.unbindAll();
      this.unsubscribe();
      this.off();
      this.remove();
    },

    unbindFrom: function (object) {
      this._bindings = this._bindings || [];

      object.off(null, null, this);

      this._bindings = _.reject(this._bindings, function (binding) {
        return binding === object;
      });
    },

    unbindAll: function () {
      this._bindings = this._bindings || [];

      var that = this;

      _.each(this._bindings, function (binding) {
        binding.off(null, null, that);
      });

      this._bindings = [];
    }
  });

  _.extend(Tent.View.prototype, Tent.PubSub);
})();
