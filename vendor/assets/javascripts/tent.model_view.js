(function () {
  Tent.ModelView = Tent.View.extend({
    initialize: function () {
      Tent.View.prototype.initialize.apply(this, arguments);
      this.el.setAttribute('data-tent-model-cid', this.model.cid);
      this._setAttributes();
      this.bindTo(this.model, 'change', this._modelChanged);
    },
    _setAttributes: function () {
      var attributes = this.model.serialize();
      this.el.setAttribute('data-tent-model-attributes', attributes);
    },
    _modelChanged: function () {
      this._setAttributes();
      this.render();
    }
  });
})();
