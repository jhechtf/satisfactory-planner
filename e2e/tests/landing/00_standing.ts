
import { Selector } from 'testcafe';

fixture('Landing Page')
  .page(
    'http://localhost:8080/'
  )

test('Default', async (t) => {
  // make sure
  await t.expect(
    Selector('body').textContent
  ).ok();
});