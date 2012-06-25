describe("Tent.View", function () {
  var view, model;

  beforeEach(function () {
    spyOn($.fn, 'remove');
    view = new Tent.View();
    model = new Backbone.Model();
  });

  describe("when binding to something", function () {
    beforeEach(function () {
      spyOn(model, 'on');
      view.bindTo(model, 'event', view.render);
    });

    it("should bind the event and context to the object", function () {
      expect(model.on).toHaveBeenCalledWith('event', view.render, view);
    });

    it("should add the object to its array of bindings", function () {
      expect(view._bindings).toContain(model);
    });

    it("should only store a reference to a bound object once", function () {
      view.bindTo(model, 'event', view.render);
      expect(view._bindings.length).toEqual(1);
    });
  });

  describe("when unbinding from something", function () {
    beforeEach(function () {
      spyOn(model, 'off');
      view.bindTo(model, 'event', view.render);
      view.unbindFrom(model);
    });

    it("should unbind the view from the object", function () {
      expect(model.off).toHaveBeenCalledWith(null, null, view);
    });

    it("should remove the object from the array of bindings", function () {
      expect(view._bindings).not.toContain(model);
    });
  });

  describe("when closing", function () {
    var anotherModel;

    beforeEach(function () {
      anotherModel = new Backbone.Model();
      view.bindTo(model, 'event', view.render);
      view.bindTo(anotherModel, 'event', view.remove);
      view.beforeClose = function () {};

      spyOn(view, 'beforeClose');
      spyOn(view, 'unsubscribe');
      spyOn(view, 'off');
      view.close();
    });

    it("should fire the beforeClose function", function () {
      expect(view.beforeClose).toHaveBeenCalled();
    });

    it("should unsubscribe from events", function () {
      expect(view.unsubscribe).toHaveBeenCalled();
    });

    it("should unbind its events", function () {
      expect(view.off).toHaveBeenCalled();
    });

    it("should remove its DOM element", function () {
      expect($.fn.remove).toHaveBeenCalled();
    });

    it("should unbind all of its bindings created with bindTo", function () {
      expect(_.keys(model._callbacks).length).toEqual(0);
      expect(_.keys(anotherModel._callbacks).length).toEqual(0);
      expect(view._bindings).toEqual([]);
    });
  });
});
