// Server-renders a form-associated component with the hydrate script of this project.
import { renderToString } from './hydrate/index.mjs';

const results = await renderToString('<form><my-field label="Name" value="Ada"></my-field></form>', {
  prettyHtml: true,
});
console.log('diagnostics:', JSON.stringify(results.diagnostics, null, 2));
console.log(results.html);
