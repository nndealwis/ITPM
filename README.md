# Singlish to Sinhala Translator - Playwright Test Suite

## Project Overview

This project contains comprehensive automated test cases for the [Swift Translator](https://www.swifttranslator.com/) web application, which translates Singlish (romanized Sinhala) to Sinhala script.

The test suite includes:

- **37 Functional Test Cases** (Positive & Negative)
- **5 UI Functionality Test Cases** (Positive & Negative)

## Test Structure

### Test Categories

#### 1. **Positive Functional Tests (Pos_Fun_0001 - Pos_Fun_0027)**

Tests that verify correct translation behavior with valid inputs:

- Simple sentences
- Compound and complex sentences
- Interrogative (questions) and imperative (commands)
- Positive and negative sentences
- Greetings and informal/polite phrasing
- Tense variations (Present, Future, Past)
- Pronoun variations (Singular, Plural)
- Short and long inputs
- English abbreviations and technical terms
- Punctuation marks and special formats
- Numeric formats (Currency)
- Time formats
- Multiple spaces and line breaks
- Paragraph-style inputs

#### 2. **Negative Functional Tests (Neg_Fun_0028 - Neg_Fun_0037)**

Tests that verify handling of problematic or invalid inputs:

- Slang and informal expressions
- Unnatural/incorrect grammar structures
- Corrupted input with symbols and codes
- Missing spaces and merged words
- Ambiguous or unclear phrases
- Formal notice style sentences
- Repetition and noisy input
- Mixed spelling and odd tokens
- Broken or unclear questions

#### 3. **Positive UI Tests (Pos_UI_0001 - Pos_UI_0003)**

- Real-time translation on typing
- Clear button functionality
- Text appearance in output as user types

#### 4. **Negative UI Tests (Neg_UI_0004 - Neg_UI_0005)**

- Empty input handling
- Special characters only input

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd "c:\STUDY\Year 03\Project\ITPM\assignment 01\playwright"
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   This will install:
   - `@playwright/test` - Playwright testing framework
   - Other required dependencies listed in `package.json`

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in UI Mode

```bash
npx playwright test --ui
```

This opens an interactive test runner where you can see tests run in real-time.

### Run Specific Test File

```bash
npx playwright test tests/swifttranslatorNew.spec.js
```

### Run Tests with Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests with Specific Pattern

```bash
npx playwright test --grep "Pos_Fun_0001"
```

### View Test Report

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Test Configuration

The test configuration is defined in `playwright.config.js` with:

- **Base URL:** https://www.swifttranslator.com/
- **Timeout:** 30 seconds per test
- **Retries:** Configured based on CI environment
- **Browsers:** Chromium, Firefox, WebKit

## Test Data Structure

Each test case object contains:

```javascript
{
  id: "Pos_Fun_0001",           // Unique test identifier
  name: "Simple sentence",       // Test description
  type: "positive",              // Test type (positive/negative)
  lengthType: "S",               // Input length (S=Short, M=Medium)
  input: "Sisun paasal giyooya.", // Singlish input
  expected: "සිසුන් පාසල් ගියෝය." // Expected Sinhala output
}
```

## Helper Functions

### `waitForTranslation(page, timeout = 2000)`

Waits for the real-time translation to complete.

### `convertAndRead(page, input)`

- Fills the input field with Singlish text
- Waits for translation
- Extracts the Sinhala output from either textarea or div elements
- Handles fallback scenarios if translation appears in different UI elements

### `hasSinhalaChars(text)`

Checks if text contains Sinhala Unicode characters (U+0D80 to U+0DF8).

## Key Features

✅ **Real-time Translation Testing** - Verifies live translation as user types  
✅ **Output Validation** - Checks for exact Sinhala character matching  
✅ **UI Interaction Testing** - Tests input fields, clear buttons, and output display  
✅ **Error Handling** - Gracefully handles missing elements or timeouts  
✅ **Comprehensive Coverage** - Tests various input types, lengths, and edge cases  
✅ **Cross-browser Support** - Runs on Chromium, Firefox, and WebKit

## Test Results

After running tests, results are saved in:

- `test-results/` - Detailed test results for failed tests
- `playwright-report/` - Interactive HTML report

## Troubleshooting

### Tests Timing Out

- Increase timeout in `playwright.config.js`
- Increase wait timeout in helper functions
- Check if https://www.swifttranslator.com/ is accessible

### Element Not Found

- UI selectors may have changed
- Update locators in `convertAndRead()` function:
  ```javascript
  const textarea = page.locator('textarea[placeholder*="Singlish"]');
  ```

### Translation Not Appearing

- Ensure adequate wait time: `await page.waitForTimeout(2000);`
- Check if JavaScript is enabled in Playwright browser
- Verify the website is fully loaded with `await page.waitForLoadState('networkidle');`

## Test Naming Convention

- **Pos_Fun_XXXX** - Positive Functional test
- **Neg_Fun_XXXX** - Negative Functional test
- **Pos_UI_XXXX** - Positive UI test
- **Neg_UI_XXXX** - Negative UI test

## Project Structure

```
playwright/
├── tests/
│   └── swifttranslatorNew.spec.js    # Main test file
├── playwright-report/                 # Test reports (generated)
├── test-results/                      # Detailed test results (generated)
├── playwright.config.js               # Playwright configuration
├── package.json                       # Dependencies
└── README.md                          # This file
```

## Dependencies

- **@playwright/test** - Testing framework
- **Node.js** - Runtime environment

See `package.json` for exact versions.

## Contributing

When adding new test cases:

1. Follow the existing test data structure
2. Use consistent naming convention (Pos_Fun, Neg_Fun, Pos_UI, Neg_UI)
3. Include descriptive names and clear expected outputs
4. Test both valid and edge case inputs
5. Run full test suite before committing

## Notes

- Tests interact with a live website, so network connectivity is required
- Translation accuracy depends on the translator's algorithm
- UI element selectors may need updates if the website design changes
- Consider adding waits for network requests to improve reliability

## Support

For issues or questions about:

- **Playwright:** Visit [Playwright Documentation](https://playwright.dev/)
- **Test Cases:** Review the test data in `swifttranslatorNew.spec.js`
- **Translator:** Visit [Swift Translator](https://www.swifttranslator.com/)

---

**Last Updated:** January 2026  
**Test Count:** 42 (37 Functional + 5 UI)  
**Browsers Tested:** Chromium, Firefox, WebKit
