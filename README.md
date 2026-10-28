# Ejada Playwright Automation Framework

## Overview
UI and API automation framework using TypeScript and Playwright.

## Technologies
- TypeScript
- Playwright
- Allure Reporting
- Node.js

## UI Automation
- Login scenarios
- Locked-out user validation
- Product selection and cart
- Checkout workflow
- Chromium and Firefox execution

## API Automation
- GET books
- POST order creation
- PATCH order update
- DELETE order
- Authentication and negative scenarios

## Installation
npm install
npx playwright install chromium firefox

## Run All Tests
npx playwright test

## Run API Tests
npx playwright test --project=api

## Run Chromium Tests
npx playwright test --project=chromium

## Run Firefox Tests
npx playwright test --project=firefox

## HTML Report
npx playwright show-report