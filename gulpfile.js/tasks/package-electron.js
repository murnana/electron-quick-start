const
    config = require("../config")["package-electron"],
    del = require("del"),
    gulp = require("gulp"),
    packageJson = require("./package-json-data"),
    packager = require("electron-packager");

const taskNameTemp = "package:%s";

module.exports = {

    "taskName": taskNameTemp

};

gulp.task("package:clean", (done) => del([config["out-dir"]], () => done()));

const taskNames = packageJson.os.map((os) => {

    const taskName = taskNameTemp.replace(/%s/, os);
    gulp.task(taskName, ["package:clean"], () => packager({
        "arch": packageJson.cpu,
        "asar": true,
        "dir": ".",
        "ignore": config["ignore-list"],
        "name": packageJson.name,
        "out": config["out-path"],
        "platform": os
    }));
    return taskName;

}).filter((value) => value);

gulp.task("package", taskNames);
