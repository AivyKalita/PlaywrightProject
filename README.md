# Demo MCP with Playwright

A small Windows-friendly learning project for using Playwright tests and the
Playwright MCP server from VS Code Agent.

## Prerequisites

- Node.js LTS and npm
- VS Code with built-in MCP support (VS Code 1.99 or later)
- The Microsoft Playwright extension is optional; the project test runner is
  installed locally with npm

In PowerShell, use `npm.cmd` and `npx.cmd` if your execution policy blocks the
PowerShell `npm.ps1` / `npx.ps1` shims.

## Install and run

From this directory in PowerShell:

```powershell
npm.cmd install
npx.cmd playwright install chromium
npm.cmd test
```

The tests cover the login page and the full sample order journey: sign in, add a
backpack to the cart, enter checkout information, review the order, and verify
the successful order confirmation.

To watch the checkout test in a visible browser window:

```powershell
npm.cmd run test:headed -- tests/checkout-flow.spec.js
```

Or run all tests with a visible browser:

```powershell
npm.cmd run test:headed
```

The checkout uses SauceDemo's public `standard_user` account and clearly fake
customer details from `test-data/order.js`. It does not submit a real-world
payment.

## GitHub Actions CI

The workflow at `.github/workflows/playwright.yml` runs the existing test suite
on pushes to `main` and `development`, pull requests targeting those branches,
and manual dispatch. It uses Node.js 24, installs locked dependencies with
`npm ci`, installs Chromium and its Linux dependencies, and runs `npm test`.
In CI, tests retry twice and run one worker at a time. The HTML report,
failure screenshots, and traces are uploaded as workflow artifacts even when
tests fail.

To download reports, open the repository's **Actions** tab, select a completed
Playwright Tests run, and download `playwright-html-report` or
`playwright-test-results` from **Artifacts**.

## VS Code MCP setup

The workspace MCP server is configured in `.vscode/mcp.json`. The requested
package name `@microsoft/mcp-server-playwright` is not published on npm (it
returns 404). The official Microsoft Playwright MCP server is published as
`@playwright/mcp`, so the configuration uses that package:

```json
{
  "servers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}
```

Open this folder in VS Code, trust the workspace if prompted, then open
`.vscode/mcp.json` and use the **Start** action shown above the `playwright`
server. Approve the server if VS Code asks. In Agent mode, enable the Playwright
tools from the tools picker. You can inspect the server or restart it from the
MCP server controls in VS Code.

## Example Agent prompts

- “Open SauceDemo and inspect the login page.”
- “Identify the username, password, and Login button.”
- “Use `standard_user` / `secret_sauce` to log in, then verify the inventory
  page is displayed.”
- “Complete the sample SauceDemo checkout with the backpack and confirm the
  successful order page.”
- “Generate a Playwright test for the SauceDemo login scenario and save it under
  `tests/`.”
- “Explain which MCP Playwright tools you used and what each one did.”

The public SauceDemo sample account credentials are also recorded in
`test-data/credentials.js`. Do not use this demo file for real credentials.
