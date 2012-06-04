describe("Tent.ModelView", function () {
  var model, view;

  beforeEach(function () {
    model = new Tent.Model({ name: 'Jonathan', age: 26 });
    view = new Tent.ModelView({ model: model });
  });

  describe("when instantiated", function () {
    it("should store a reference to its cid", function () {
      expect(view.el.getAttribute('data-tent-model-cid')).toEqual(model.cid);
    });

    it("should store its model's attributes in its element", function () {
      expect(view.el.getAttribute('data-tent-model-attributes')).toEqual(JSON.stringify(model.attributes));
    });
  });

  describe("when its model is changed", function () {
    it("should update its model's attributes in its element", function () {
      model.set('name', 'Clem');
      expect(view.el.getAttribute('data-tent-model-attributes')).toEqual(JSON.stringify(model.attributes));
    });

    it("should render itself", function () {
      spyOn(view, 'render');
      model.set('name', 'Clem');
      expect(view.render).toHaveBeenCalled();
    });
  });

  describe("when closing", function () {
    beforeEach(function () {
      spyOn(Tent.View.prototype, 'close').andCallThrough();
      spyOn(view.model, 'off');
      view.close();
    });

    it("should call Tent.View's close function", function () {
      expect(Tent.View.prototype.close).toHaveBeenCalled();
    });

    it("should unbind events from its model", function () {
      expect(view.model.off).toHaveBeenCalledWith(null, null, view);
    });
  });
});
