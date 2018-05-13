# Reader: SCSS

Extracts all variables from the provided `.scss` file. This plugin does not perform recursive walk, but it works with a single file.

Supports: `color`, `dimension`, `operation`, `text`, `simple value` and `variable` variables.

## Installation

> yarn add --dev @resource-sentry/reader-scss

## Configuration

- `entry`, path to SCSS file.

## Example

```scss
$prf-value-one-hundred: 100;
$breakpoint: 768px;
$rhythm: 4px;
$padding-s: 2*$rhythm;
```

SCSS variables will be compiled into `rs.js` file ready for use in production code.

```js
import Rs from './rs';

Rs.getResource(Rs.Value.PRF_VALUE_ONE_HUNDRED); // Return 100
Rs.getResource(Rs.Dimension.BREAKPOINT); // Return 768
Rs.getResource(Rs.Dimension.RHYTHM); // Return 4
Rs.getResource(Rs.Dimension.PADDING_S); // Return 8
```
