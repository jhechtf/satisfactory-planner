import App from './app.svelte';

var app = new App({
  target: document.body,
});

export default app;

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('whats up!');
  });
  import.meta.hot.dispose(() => {
    console.log('burn that bitch')
    app.$destroy();
  });
}
