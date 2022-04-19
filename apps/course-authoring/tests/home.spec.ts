import { _electron as electron } from 'playwright';
import { test, expect } from '@playwright/test';

let appWindow;
let electronApp;

test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ['./dist/main.js'] });
  appWindow = await electronApp.firstWindow();
});

test('Should render title bar title element', async () => {
  const title = await appWindow.locator('.title-bar__title');

  await expect(title).toHaveText('Scrowl - Home');
});

test('Should render icon element', async () => {
  const title = await appWindow.locator('.nav__title__icon');

  await expect(title).toHaveText('school');
});

test.afterAll(async () => {
  await electronApp.close();
});
