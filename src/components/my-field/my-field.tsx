import { AttachInternals, Component, Prop, State, h } from '@stencil/core';

// A minimal form-associated custom element, as documented at
// https://stenciljs.com/docs/form-associated
@Component({ tag: 'my-field', formAssociated: true, shadow: true })
export class MyField {
  @AttachInternals() internals!: ElementInternals;
  @Prop() value = '';
  @Prop() label = '';
  @State() loaded = false;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
    // Never runs on the server: the call above throws.
    this.loaded = true;
  }

  render() {
    return (
      <label>
        {this.label}
        <input value={this.value} data-loaded={String(this.loaded)} />
      </label>
    );
  }
}
