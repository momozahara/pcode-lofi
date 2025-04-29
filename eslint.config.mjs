import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  prettier,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleAttributePerLine: true,
        },
      ],
      curly: "error",
      camelcase: "error",
      eqeqeq: "error",
      "no-undef": "off",
      "no-useless-escape": "off",

      "object-curly-newline": [
        "error",
        {
          ObjectExpression: "always",
          ObjectPattern: {
            multiline: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
