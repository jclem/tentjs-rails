describe("Tent.Collection", function () {
  var collection;

  beforeEach(function () {
    model = new Tent.Model({ name: 'Jonathan', age: 26 });
    collection = new Tent.Collection([model]);
  });

  it("should extend Backbone.Collection", function () {
    expect(Tent.Collection.__super__).toEqual(Backbone.Collection.prototype);
  });

  describe("when serializing itself", function () {
    it("should return a stringified representation of its contents", function () {
      expect(collection.serialize()).toEqual(JSON.stringify(collection.toJSON()));
    });
  });
});
