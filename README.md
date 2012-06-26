# tentjs-rails

Tent.js is a lightweight structure built on top of Backbone.js

## Installation

Add this line to your application's Gemfile:

    gem 'tentjs-rails'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install tentjs-rails

## Using Tent

Rather than extending Backbone prototypes directly, Tent builds on top of them. That way, you can still create vanilla Backbone View, Models, and Collections without the additions that Tent provides. So, creating a view that uses Tent's extensions looks like this:

```
view = new Tent.View();
```

## Tent.App

`Tent.App` is a very basic module that includes an internal reference to `Tent.Dispatcher` and fires a `tent:app:started` event when its `start` function is called.

```
window.Application = new Tent.App();
```

## Tent.Collection and Tent.Model

`Tent.Collection` and `Tent.Model` are exactly like a `Backbone.Collection` and `Backbone.Model`, respectively, except that they each have a `serialize` function which calls `JSON.stringify` on the result of their `toJSON` functions.

## Tent.PubSub

Tent includes a handy global event dispatcher called `Tent.Dispatcher`. Anything that includes the `Tent.PubSub` module is able to communicate with this dispatcher like so:

### Subscribing to events

The `subscribe` function ensures that a callback is fired when the dispatcher sees the specified event.

```
view.subscribe('some:event', view.doSomething)
```

### Unsubscribing from events

Calling `unsubscribe` with an event and a callback unsubscribes that callback from the specified event. Specifying a callback with no event unsubscribes that callback from all events. Specifying an event with no callback unsubscribes all callbacks from that event for the calling object. Calling `unsubscribe` with no arguments unsubscribes the calling object completely from the dispatcher events.

```
view.unsubscribe('an:event', view.doSomething);
view.unsubscribe(null, view.doSomething);
view.unsubscribe('an:event');
view.unsubscribe();
```

### Publishing events

An object can publish events to the dispatcher using `publish`.

```
view.publish('some:event', anArgument, anotherArgument);
```

### Using Tent.PubSub

To include Tent.PubSub in an object prototype:

```
_.extend(Something.prototype, Tent.PubSub);
```

## Tent.View

### Binding to an object

By binding to an object using the `view.bindTo()` function, one can ensure that the binding is released when the view is closed using Tent's `view.close()` function.

```
view.bindTo(view.model, 'change', view.doSomething);
```

`bindTo` limits you to using the calling object as the context, which makes unbinding easier. If you must use another object as the context for a binding callback, use Backbone's `on` function.


### Unbinding from an object

Unbinding from an object is done with `unbindFrom`:

```
view.unbindFrom(view.model);
```

### Releasing all bindings

When closing a view, Tent's `close` function takes care of releasing bindings made with `bindTo`, but the bindings can also all be released with `unbindAll`.

```
view.unbindAll();
```

### Closing a view

Calling `view.close()` will do a fiew things:

1. Call `view.beforeClose()` if it's been defined.
2. Call `view.unbindAll()` to get rid of bindings.
3. Call `view.off()` to get rid of DOM bindings.
4. Call `view.remove()` to remove the view DOM element itself.

## Tent.ModelView

### Initializing

`Tent.ModelView` has its own `initialize` function, so you'll want to make sure that when overriding it, you'll generally want to still use the built-in function:

```
Application.SomeModelView = Tent.ModelView.extend({
  initialize: function () {
    Tent.ModelView.prototype.initialize.apply(this, arguments);
    // ...
  }
});
```
When a `Tent.ModelView` initializes, it sets an attribute called `data-model-cid` on its element whose value is the `cid` of the instance of `Tent.Model`* that was passed into the constructor:

```
var model = new Tent.Model();
var view = new Tent.ModelView({ model: model });
view.el.getAttribute('data-model-cid'); // === model.cid
```

The element also gets an attribute called `data-model-attributes` that contains a serialized version of all of the model's attributes (note that this uses the `Tent.Model.prototype.serialize` function).

* `Tent.ModelView` will only initialize properly when passed an instance a `Tent.Model`.

### Changing the model

`Tent.ModelView` will update its `data-model-attributes` and re-render when the model's `change` event is fired.