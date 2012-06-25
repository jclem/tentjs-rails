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
