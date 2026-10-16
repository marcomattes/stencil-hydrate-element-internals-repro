# Stencil: `ElementInternals` methods are not functions in the hydrate app (SSR)

A form-associated component that calls `this.internals.setFormValue()` in `componentWillLoad`
throws `TypeError: this.internals.setFormValue is not a function` when it is server-side rendered
with the hydrate app, and the rest of the hook never runs on the server.

```sh
npm i
npm run build   # dist-hydrate-script
npm run repro   # renderToString('<form><my-field label="Name" value="Ada"></my-field></form>')
```

Actual: a `Hydrate Error` diagnostic and `<input data-loaded="false" value="Ada">`: the
`this.loaded = true` after `setFormValue()` in `componentWillLoad` never runs.
Expected: no diagnostic and `data-loaded="true"`, as in the browser.

Affected: `@stencil/core` 4.45.1, 4.45.2 and 5.0.0-beta.26. The cause is
`MockElement.attachInternals()` in mock-doc, which returns a `Proxy` that answers `undefined` for
every property, including the methods.
