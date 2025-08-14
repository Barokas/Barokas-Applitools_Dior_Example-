# Visual Testing with Playwright and Applitools

This repository demonstrates how to perform visual testing on a website using **Playwright** for functional checks and **Applitools Visual AI** for comprehensive visual validation. It includes two example test files to showcase the differences between traditional, element-by-element assertions and Applitools' holistic approach.

-----

## 🚀 Getting Started

This guide will help you set up and run the tests in this repository.

### Prerequisites

  * **Node.js**: Make sure you have Node.js installed on your machine.
  * **Applitools API Key**: You'll need an API key from Applitools. You can get one by signing up for a free account. Learn more about getting your API key in the [Applitools documentation](https://www.google.com/search?q=https://applitools.com/docs/api/eyes-sdk/how-to-get-your-api-key).

### Installation

1.  Clone this repository:

    ```bash
    git clone [repository-url]
    cd [repository-name]
    ```

2.  Install the project dependencies, including `@playwright/test` and `@applitools/eyes-playwright`:

    ```bash
    npm install
    ```

3.  Configure your Applitools API key. You can do this by setting the `APPLITOOLS_API_KEY` environment variable or by updating the `apiKey` field in the `playwright.config.ts` file.

    **Option 1: Environment Variable (Recommended)**

    ```bash
    export APPLITOOLS_API_KEY='YOUR_API_KEY'
    ```

    **Option 2: Edit `playwright.config.ts`**

    ```typescript
    // playwright.config.ts
    // ...
    eyesConfig: {
      // ...
      apiKey: 'YOUR_API_KEY', // <- Replace with your actual API key
      // ...
    },
    // ...
    ```

-----

## 🎭 Test Examples

This repository contains two sets of tests to illustrate different testing methodologies.

### 1\. `DiorTraditional.spec.ts` (Playwright Native Assertions)

This file demonstrates a traditional approach to testing. It uses **Playwright's native assertions** to check for the visibility of individual elements on the page.

#### Key Characteristics:

  * **Brittle**: Tests can easily break if an element's locator changes.
  * **Time-consuming**: Each element requires a separate `expect` statement, which takes longer to write.
  * **High Maintenance**: If the UI changes, many test lines may need to be updated.
  * **Limited Coverage**: This approach validates the presence of elements but doesn't check for layout, styling, or visual regressions.

**Example from `DiorTraditional.spec.ts`**:

```typescript
test('Header and main navigation are visible', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('a[aria-label*="Guildhall"], a[title*="Guildhall"]')).toBeVisible();
    await expect(page.locator('a:has-text("Study")')).toBeVisible();
    // ... many more lines of code
});
```

### 2\. `DiorEyes.spec.ts` (Applitools Visual AI)

This file showcases the power of **Applitools Visual AI** for comprehensive visual testing. With a single line of code, it captures a screenshot of the entire page and compares it against a baseline image, checking for any visual discrepancies.

#### Key Characteristics:

  * **Holistic View**: Validates the entire page layout, content, and styling, not just individual elements.
  * **Reduced Maintenance**: A single `eyes.check()` command covers the whole page, so you don't need to update your tests for minor UI changes.
  * **Increased Coverage**: Automatically detects visual bugs, misalignments, and content changes that traditional tests would miss.
  * **Single-Line Validation**: A single command replaces dozens of individual assertions.

**Example from `DiorEyes.spec.ts`**:

```typescript
test('Hope Page without Popup', async ({ page, eyes }) => { 
    await eyes.check('full page', {
        fully: true,
        target: 'window',
        lazyLoad: { scrollLength: 1500, waitingTime: 750, maxAmountToScroll: 5000 },
    });
});
```

You can find more information about the Eyes Playwright SDK in the [Applitools documentation](https://www.google.com/search?q=https://applitools.com/docs/api/eyes-playwright/overview).

-----

## 💻 Running the Tests

### Running Functional Playwright Tests

To run the tests that use native Playwright assertions:

```bash
npx playwright test DiorTraditional.spec.ts
```

### Running Applitools Visual AI Tests

To run the tests that use Applitools for visual validation:

```bash
npx playwright test DiorEyes.spec.ts
```

These tests will run and send the results to your Applitools dashboard for review.

### Running with the Ultrafast Grid (UFG)

The `playwright.config.ts` file is configured to use the **Applitools Ultrafast Grid (UFG)**. This allows a single test run to generate screenshots across multiple browsers and viewports, without running the test multiple times. This drastically speeds up the testing process.

The configuration currently includes:

  * **Desktop Browsers**:
      * Chrome (800x600, 1024x768)
      * Firefox (800x600, 1024x768)
      * Edge (800x600, 1024x768)
  * **Mobile Devices**:
      * Pixel 5 (portrait emulation)
      * iPad (7th generation) (landscape emulation)

You can run the UFG tests with the following command:

```bash
npx playwright test DiorEyes.spec.ts
```

-----

## 🎨 Visualizing the Results

After running the tests with Applitools, visit your **Applitools Dashboard** to see the results. The dashboard provides a powerful interface to review, approve, or reject visual differences, manage baselines, and collaborate with your team.
