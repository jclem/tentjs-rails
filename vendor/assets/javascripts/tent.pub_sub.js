(function () {
  Tent.PubSub = {
    publish: function () {
      Tent.Dispatcher.trigger.apply(Tent.Dispatcher, arguments);
    },
    subscribe: function (events, callback) {
      Tent.Dispatcher.on(events, callback, this);
    },
    unsubscribe: function (event, callback) {
      Tent.Dispatcher.off(event, callback, this);
    },
  };
})();
