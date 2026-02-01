# Singlish to Sinhala Translator – Playwright Test Automation

## Introduction

This project is created as part of a ITPM assignment 1 to automate testing for the **Swift Translator** website, which converts Singlish into Sinhala.

The tests are written using **Playwright** to check both **functional behavior** and **UI behavior** of the application.

---

## Test Types

### Functional Test Cases

- Positive test cases (valid inputs)
- Negative test cases (invalid or problematic inputs)
- Covers simple sentences, long sentences, questions, commands, slang, symbols, mixed English words, numbers, and formatting issues

### UI Test Cases

- Real-time translation while typing
- Clear button functionality
- Empty and invalid input handling

---

## Tools Used

- Node.js
- Playwright
- JavaScript

---

## Project Structure

```
playwright/
├── tests/
│   └── swifttranslatorNew.spec.js
├── playwright.config.js
├── package.json
├── test-results/
├── playwright-report/
└── README.md
```

---

## Prerequisites

- Node.js (version 14 or above)
- npm
- Internet connection (tests run on a live website)

---

## Setup

1. Open terminal and go to the project folder:

```bash
cd playwright
```

2. Install dependencies:

```bash
npm install
```

---

## How to Run the Tests

To run **all test cases**:

```bash
npx playwright test
```

This command will:

- Run all functional and UI tests
- Execute tests in headless browser mode
- Automatically generate test results and report

---

## How to View the Test Report

After tests finish running, open the HTML report using:

```bash
npx playwright show-report
```

The report shows:

- Passed and failed test cases
- Error details
- Screenshots for failed test cases
- Execution time

---

## Screenshots and Evidence

- Screenshots are automatically captured for **failed test cases**
- Screenshots are stored inside:

```
test-results/
```

- Each failed test includes:
  - Screenshot of the failure
  - Error message
  - Test case ID

These screenshots are used as **evidence for test execution**.

---

## Notes

- Test cases are manually created based on real user inputs
- Naming conventions are followed for easy identification:
  - `Pos_Fun_XXXX`
  - `Neg_Fun_XXXX`
  - `Pos_UI_XXXX`
  - `Neg_UI_XXXX`

- Test results may vary depending on network speed or website changes

---

## Conclusion

This project demonstrates the use of **Playwright automation testing** to validate a real-world web application. Both valid and invalid scenarios are tested to ensure accuracy and reliability of the translator.

---

**Author:** Nimesh De Alwis
**Student ID : IT23846586 **

---
