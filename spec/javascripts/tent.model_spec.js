describe("Tent.Model", function () {
  var model;

  beforeEach(function () {
    model = new Tent.Model({ name: 'Jonathan', age: 25 });
  });

  it("should extend Backbone.Model", function () {
    expect(Tent.Model.__super__).toEqual(Backbone.Model.prototype);
  });

  describe("when serializing itself", function () {
    it("should return a hash of its attributes", function () {
      expect(model.serialize()).toEqual(JSON.stringify(model.toJSON()));
    });
  });
});
