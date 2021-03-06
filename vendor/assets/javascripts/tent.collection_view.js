(function () {
  Tent.CollectionView = Tent.View.extend({
    initialize: function (options) {
      var that = this;

      options = _.extend({
        modelView: Tent.ModelView
      }, options);

      this._modelViews = {};
      this.bindTo(this.collection, 'add', this._collectionAdd);
      this.bindTo(this.collection, 'remove', this._collectionRemove);

      _.each(this.collection.models, function (model) {
        that._modelViews[model.cid] = new options.modelView({ model: model });
      });
    },

    close: function () {
      Tent.View.prototype.close.apply(this, arguments);

      _.each(this._modelViews, function (view) {
        view.close();
      });

      this._isRendered = false;
    },

    render: function () {
      var that = this;

      _.each(this._modelViews, function (view) {
        that.$el.append(view.render().el);
      });

      this._isRendered = true;

      return this;
    },

    _collectionAdd: function () {
      var model = this.collection.last();
      this._modelViews[model.cid] = new Tent.ModelView({ model: model });

      if (this._isRendered) {
        this.$el.append(this._modelViews[model.cid].render().el);
      }
    },

    _collectionRemove: function (model) {
      this._modelViews[model.cid].close();
      delete this._modelViews[model.cid];
    }
  });
})();
