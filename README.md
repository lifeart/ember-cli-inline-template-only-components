ember-cli-inline-template-only-components
==============================================================================

This addon allow developers create inline template only components.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-inline-template-only-components
```


Usage
------------------------------------------------------------------------------

* wrap template logic inside `InlineComponentTemplate` component.
* specify local name in `name` attribute.

* invoke locally defined component using `component` helper and `from-inline-template` helper.

```hbs

<InlineComponentTemplate name="congrats">
  Hello, World, I'm {{@name}}
</InlineComponentTemplate>

{{component (from-inline-template "congrats") name="Template"}}


```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
