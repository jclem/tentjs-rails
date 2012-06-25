# Tentjs::Rails

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