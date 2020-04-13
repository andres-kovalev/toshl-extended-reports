module.exports = {
    "rules": {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "comma-dangle": ["error", "never"],
        "object-curly-newline": [
            "error",
            {
                "multiline": true,
                "consistent": true
            }
        ],
        "no-plusplus": [
            "error",
            {
                "allowForLoopAfterthoughts": true
            }
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "mjs": "never",
                "jsx": "never"
            }
        ],
        "array-bracket-spacing": [ "error", "always" ],
        "template-curly-spacing": [ "error", "always" ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-use-before-define": ["error", {
            "functions": false,
            "classes": false
        }],
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        "react/prefer-stateless-function": "error",
        "react/forbid-prop-types": "error",
        "react/forbid-foreign-prop-types": "error",
        "react/no-access-state-in-setstate": "error",
        "react/no-array-index-key": "error",
        "react/no-direct-mutation-state": "error",
        "react/prop-types": "error",
        "react/jsx-no-bind": [ "error", {
            "allowArrowFunctions": true
        }],
        "react/jsx-no-target-blank": "error",
        "spaced-comment": "off",
        "implicit-arrow-linebreak": "off"
    },
    "extends": [
        "eslint:recommended",
        "airbnb-base"
    ],
    "plugins": [
        "react",
        "jsx-a11y"
    ],
    "env": {
        "browser": true,
        "es6": true,
        "es2017": true,
        "jest": true
    },
    "globals": {
        "document": false,
        "sinon": true
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx"]
            }
        }
    }
}
