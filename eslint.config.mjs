import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;



// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   // .eslintrc.js
//   module.exports = {
//     env: {
//       browser: true,
//       node: true,
//     },
//     extends: ['next/core-web-vitals', 'eslint:recommended'],
//     rules: {
//       'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//       'react/react-in-jsx-scope': 'off', // Example: Next.js doesn’t need React in scope
//     },
//   }

// ];

// export default eslintConfig;
