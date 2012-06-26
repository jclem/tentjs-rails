(function () {
  Tent.ModelView = Tent.View.extend({
    initialize: function () {
      this.el.setAttribute('data-model-cid', this.model.cid);
      this._setAttributes();
      this.bindTo(this.model, 'change', this._modelChanged);
    },
    _setAttributes: function () {
      var that = this;
      var attributes = this.model.serialize();
      this.el.setAttribute('data-model-attributes', attributes);
    },
    _modelChanged: function () {
      this._setAttributes();
      this.render();
    }
  });
})();
