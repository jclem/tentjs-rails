(function () {
  Tent.App = function () {};

  _.extend(Tent.App.prototype, Tent.PubSub, {
    dispatcher: Tent.Dispatcher,
    start: function () {
      this.publish('tent:app:started');
    }
  });
})();
