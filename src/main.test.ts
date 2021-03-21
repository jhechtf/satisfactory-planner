import { render } from '@testing-library/svelte';

import App from './app.svelte';

test('Something Something', () => {
  // I present to you, the world's roughest unit test.
  const { container } = render(App);
  expect(container.textContent).not.toBeNull()
})