const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const url = pathToFileURL(path.resolve(__dirname, '..', 'bgm-desafio.html')).href;

test('Desafío abre y permite empezar ambos jugadores', async ({ page }) => {
  await page.goto(url);
  await expect(page.getByRole('heading', { name: /Desafío/ })).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar / continuar' }).click();
  await expect(page.locator('#status')).toContainText('Mano 1/8');
  await expect(page.locator('#south button.card')).toHaveCount(13);
  await page.locator('#player').selectOption('B');
  await page.getByRole('button', { name: 'Iniciar / continuar' }).click();
  await expect(page.locator('#status')).toContainText('Mano 1/8');
  await expect(page.locator('#south button.card')).toHaveCount(13);
  await expect(page.locator('#compareBody tbody tr')).toHaveCount(8);
});

test('Desafío aplica obligación de asistir y avanza una baza', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Iniciar / continuar' }).click();
  await expect(page.locator('#status')).toContainText('Te corresponde jugar');
  for (let i=0;i<4;i++) {
    await page.locator('button.card.playable').first().click();
    await expect(page.locator('#status')).toContainText('Te corresponde jugar');
  }
  await expect(page.locator('#status')).toContainText('Carta  ');
});
