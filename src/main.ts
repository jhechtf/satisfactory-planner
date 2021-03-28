import App from './app.svelte';
import './classes/recipe';
var app = new App({
  target: document.body,
});

export default app;
import('./data/items.json')
  .then((res) => {
    console.log(res.default.map(v => v.id));
  })
  .catch(console.error);
import('./data/recipes.json')
  .then((res) => {
    const sample = res.default.slice(0, 5);
    for (const recipe of sample) {
      for (let item of recipe.inputs.concat(recipe.outputs)) {
        console.log(item);
      }
    }
  })
  .catch(console.error);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
