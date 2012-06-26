describe("Tent.CollectionView", function () {
  var collection, model, view;

  beforeEach(function () {
    Dummy = {};
    Dummy.ModelView = Tent.ModelView.extend({});
    model = new Tent.Model({ name: 'Jonathan', age: 26 });
    collection = new Backbone.Collection();
    collection.add(model);
    view = new Tent.CollectionView({ collection: collection });
  });

  it("should be able to retrieve its model views", function () {
    expect(_.keys(view._modelViews).length).toEqual(1);
    expect(view._modelViews[model.cid].$el.attr('data-model-cid')).toEqual(model.cid);
  });

  describe("when instantiated", function () {
    var renderSpy;

    beforeEach(function () {
      spyOn(Dummy, 'ModelView');
      renderSpy = spyOn(Tent.CollectionView.prototype, 'render');
      view = new Tent.CollectionView({ collection: collection, modelView: Dummy.ModelView });
    });

    it("should an accept and create a model view type", function () {
      expect(Dummy.ModelView).toHaveBeenCalled();
    });
  });

  describe("when rendering", function () {
    beforeEach(function () {
      spyOn(view._modelViews[model.cid], 'render').andCallThrough();
      view.render();
    });

    it("should render each of its ModelViews into its element", function () {
      expect(view._modelViews[model.cid].render).toHaveBeenCalled();
    });
  });

  describe("when its collection is updated", function () {
    describe("when a model is added to it", function () {
      var newModel;

      beforeEach(function () {
        newModel = new Tent.Model({ name: 'Taylor', age: 24 });
        view.collection.add(newModel);
      });

      it("should create a new view for the new model", function () {
        expect(view._modelViews[newModel.cid]).toBeDefined();
      });

      describe("when the collection view has been rendered", function () {
        beforeEach(function () {
          view.render();
        });

        it("should append the model to the view", function () {
          expect(view.$el.find('[data-model-cid="' + newModel.cid + '"]').length).toEqual(1);
        });
      });

      describe("when the collection view has not been rendered", function () {
        it("should not append the model to the view", function () {
          expect(view.$el.find('[data-model-cid="' + newModel.cid + '"]').length).toEqual(0);
        });
      });
    });

    describe("when a model is removed from it", function () {
      var closeSpy;

      beforeEach(function () {
        closeSpy = spyOn(view._modelViews[model.cid], 'close');
        view.collection.remove(model);
      });

      it("should close the view of the removed model", function () {
        expect(closeSpy).toHaveBeenCalled();
      });

      it("should remove the view from its ModelViews", function () {
        expect(view._modelViews[model.cid]).not.toBeDefined();
      });
    });
  });

  describe("when closing", function () {
    beforeEach(function () {
      spyOn($.fn, 'remove');
      spyOn(view.collection, 'off');
      spyOn(view, 'off');
      spyOn(Tent.View.prototype, 'close').andCallThrough();
      view.close();
    });

    it("should call Tent.View's close function", function () {
      expect(Tent.View.prototype.close).toHaveBeenCalled();
    });

    it("should unbind events from its collection", function () {
      expect(view.collection.off).toHaveBeenCalledWith(null, null, view);
    });

    it("should close each of its ModelViews", function () {
      expect(view._modelViews[model.cid].close).toHaveBeenCalled();
    });
  });
});
