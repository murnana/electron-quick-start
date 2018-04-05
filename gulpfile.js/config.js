module.exports = {

    "package-electron": {
        "ignore-list": [

            ".vscode",
            ".git",
            "gulpfile.js",
            "node_modules",
            "/packages($|/)",
            ".gitignore",
            "package-lock.json"

        ],
        "out-dir": "packages",
        "zip-name-temp": "{os}-{cpu}.zip"
    }

};