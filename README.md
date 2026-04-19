# @arckit/cucumber

Cucumber.js testing utilities for BDD step definitions.

[![npm version](https://img.shields.io/npm/v/@arckit/cucumber)](https://www.npmjs.com/package/@arckit/cucumber)
[![npm downloads](https://img.shields.io/npm/dm/@arckit/cucumber)](https://www.npmjs.com/package/@arckit/cucumber)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@arckit/cucumber)](https://bundlephobia.com/package/@arckit/cucumber)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber&logoColor=white)](https://cucumber.io/)

## 📑 Table of Contents

- 🪧 [About](#about)
- 📦 [Installation](#installation)
- 🚀 [Usage](#usage)
- 📖 [API](#api)
- 🤗 [Contributing](#contributing)
- 📝 [License](#license)

<h2 id="about">🪧 About</h2>

DataTable assertion helper for [Cucumber.js](https://cucumber.io/) step definitions. Supports nested property access via dot notation and array indexing.

<h2 id="installation">📦 Installation</h2>

```bash
pnpm add -D @arckit/cucumber
```

<h2 id="usage">🚀 Usage</h2>

```typescript
import { assertMatchesDataTable } from '@arckit/cucumber';

Then(/^I should see the client$/, (dataTable: DataTable) => {
  assertMatchesDataTable(dataTable)(client);
});
```

With a DataTable like:

```gherkin
| Field                | Value              |
| name.firstname       | Jean               |
| name.lastname        | Dupont             |
| address.street       | 123 Rue de la Paix |
| address.zipcode      | 75001              |
| lines[0].label       | Prestation         |
```

<h2 id="api">📖 API</h2>

### `assertMatchesDataTable(dataTable: DataTable) => (actual: unknown, options?: { message?: string }) => void`

| Parameter | Description |
|-----------|-------------|
| `dataTable` | A Cucumber `DataTable` with two columns: field path and expected value |
| `actual` | The object to assert against |
| `options.message` | Optional custom error message if the object is undefined |

Field paths support dot notation (`name.firstname`) and bracket notation for arrays (`lines[0].label`). Values are compared as strings using `deepStrictEqual`.

<h2 id="contributing">🤗 Contributing</h2>

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

<h2 id="license">📝 License</h2>

[MIT](LICENSE) &copy; Marc Gavanier
