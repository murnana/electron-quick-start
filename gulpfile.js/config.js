module.exports = {

    "package-electron": {
        "ignore-list": [

            ".vscode",
            ".git",
            "dist",
            "gulpfile.js",
            "node_modules",
            "/package($|/)",
            ".gitignore",
            "package-lock.json"

        ],
        "out-dir": "package",
        "out-path": "packages"
    },

    "zip": {
        "input-path": "packages",
        "out-path-temp": "{os}-{cpu}.zip",
        "output-dir": "dist",
    }

};