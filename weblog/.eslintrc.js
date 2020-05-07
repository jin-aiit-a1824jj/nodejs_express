module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jqueery": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent":[
            "error",
            2,
            { "Swtichcase" : 1 }
        ],
        "quotes":[
            "error",
            "double"
        ],
        "semi":[
            "error",
            "always"
        ],
        "no-unused-vars":[
            "error",
            {
                "vars": "all",
                "args": "node"
            }
        ],
        "no-console":[
            "off"
        ]
    }
};