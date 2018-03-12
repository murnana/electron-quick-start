const
    del = require("del"),
    gulp = require("gulp"),
    packager = require("electron-packager"),
    shell = require("gulp-shell");


gulp.task("clean", (done) => del(["package"], () => done()));

gulp.task("package:win32", ["clean"], (done) => packager(
    {
        "arch": "x64",
        "asar": true,
        "dir": ".",
        "ignore": "/package($|/)",
        "name": "",
        "out": "package/win32",
        "platform": "win32"
    },

    (err) => done(err)
));

gulp.task("package:linux", ["clean"], (done) => packager(
    {
        "arch": "x64",
        "asar": true,
        "dir": ".",
        "ignore": "/package($|/)",
        "name": "",
        "out": "package/linux",
        "platform": "linux"
    },

    (err) => done(err)
));


gulp.task("package:darwin", ["clean"], (done) => packager(
    {
        "arch": "x64",
        "asar": true,
        "dir": ".",
        "ignore": "/package($|/)",
        "name": "",
        "out": "package/darwin",
        "platform": "darwin"
    },

    (err) => done(err)
));


gulp.task("zip:darwin", ["package:darwin"], shell.task([
    "echo hello",
    "zip -r guiflow-darwin.zip guiflow-darwin-x64"
], {"cwd": "./package/darwin/"}));


gulp.task("zip:win32", ["package:win32"], shell.task([
    "echo hello",
    "zip -r guiflow-win32.zip guiflow-win32-x64"
], {"cwd": "./package/win32/"}));


gulp.task("zip:linux", ["package:linux"], shell.task([
    "echo hello",
    "zip -r guiflow-linux.zip guiflow-linux-x64"
], {"cwd": "./package/linux/"}));


gulp.task("package", [
    "package:win32",
    "package:darwin",
    "package:linux"
]);


gulp.task("zip", [
    "zip:win32",
    "zip:darwin",
    "zip:linux"
]);
