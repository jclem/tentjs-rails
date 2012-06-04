describe("Tent.PubSub", function () {
  var Dummy = {},
      pubSub = Tent.PubSub;

  Dummy.callback = function () {};

  beforeEach(function () {
    spyOn(Tent.Dispatcher, 'trigger');
    spyOn(Tent.Dispatcher, 'on');
    spyOn(Tent.Dispatcher, 'off');
  });

  describe("when publishing events", function () {
    it("should trigger an event on the dispatcher", function () {
      pubSub.publish('event');
      expect(Tent.Dispatcher.trigger).toHaveBeenCalledWith('event');
    });

    describe("with arguments", function () {
      it("should trigger an event on the dispatcher, and call the arguments", function () {
        pubSub.publish('event', 1, 2, 3);
        expect(Tent.Dispatcher.trigger).toHaveBeenCalledWith('event', 1, 2, 3);
      });
    });
  });

  describe("when subscribing to events", function () {
    it("should tell the dispatcher to observe the event", function () {
      pubSub.subscribe('event', Dummy.callback);
      expect(Tent.Dispatcher.on).toHaveBeenCalledWith('event', Dummy.callback, pubSub);
    });
  });

  describe("when unsubscribing to events", function () {
    it("should tell the dispatcher not to observe the event", function () {
      pubSub.unsubscribe('event', Dummy.callback);
      expect(Tent.Dispatcher.off).toHaveBeenCalledWith('event', Dummy.callback, pubSub);
    });
  });
});
