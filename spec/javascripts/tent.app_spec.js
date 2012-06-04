describe("Tent.App", function () {
  var app;

  beforeEach(function () {
    spyOn(Tent.Dispatcher, 'trigger');
    app = new Tent.App();
  });

  it("should store a reference to the dispatcher", function () {
    expect(app.dispatcher).toEqual(Tent.Dispatcher);
  });

  describe("when started", function () {
    beforeEach(function () {
      app.start();
    });

    it("should publish an event", function () {
      expect(Tent.Dispatcher.trigger).toHaveBeenCalledWith('tent:app:started');
    });
  });
});
