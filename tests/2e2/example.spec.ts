import { test, expect } from '@playwright/test'

test('loading all doujinsh', async ({ page }) => {
  await page.goto('/407381')

  await expect(page.locator('button')).toContainText('Download')
})
