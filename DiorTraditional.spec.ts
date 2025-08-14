import { test, expect } from '@applitools/eyes-playwright/fixture';

import { test, expect } from '@applitools/eyes-playwright/fixture';

const DIOR_PRODUCT_URL = 'https://www.dior.com/en_int/beauty/products/la-mousse-off%2Fon-foaming-cleanser-Y0000013.html';

test.describe('Dior Product PDP Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DIOR_PRODUCT_URL);
  });

  test('Product title is visible and not empty', async ({ page }) => {
    const title = page.locator('h1, [data-testid="product-title"], .product-title');
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText('');
  });

  test('"Add To Bag" button is visible', async ({ page }) => {
    const addToBag = page.locator('button:has-text("Add to Bag"), [data-testid="add-to-bag"], .add-to-bag');
    await expect(addToBag).toBeVisible();
  });

  test('Favorite button is visible', async ({ page }) => {
    const favorite = page.locator('button:has-text("Favorite"), [data-testid="favorite"], .favorite');
    await expect(favorite).toBeVisible();
  });

  test('Mini and Large Model options are present', async ({ page }) => {
    const miniOption = page.locator('button:has-text("Mini"), [data-testid="model-mini"], .model-mini');
    const largeOption = page.locator('button:has-text("Large"), [data-testid="model-large"], .model-large');
    await expect(miniOption).toBeVisible();
    await expect(largeOption).toBeVisible();
  });

  test('Product image is displayed', async ({ page }) => {
    const productImage = page.locator('img[alt*="Dior"], [data-testid="product-image"], .product-image');
    await expect(productImage).toBeVisible();
    await expect(productImage).toHaveAttribute('src', /.+/);
  });

  test('Specifications section is visible and contains content', async ({ page }) => {
    const specs = page.locator('[data-testid="specifications"], .product-specifications, #specifications');
    await expect(specs).toBeVisible();
    await