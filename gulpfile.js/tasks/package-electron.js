const
    config = require("../config")["package-electron"],
    del = require("del"),
    gulp = require("gulp"),
    packageJson = require("./package-json-data"),
    packager = require("electron-packager"),
    zip = require("gulp-zip");

const taskName = (name) => "package-electron:{name}".replace(/{name}/, name);

// ベースタスク名のリスト
let taskNames = {
    "clean-package": [],
    "package": [],
    "clean-zip": [],
    "zip": []
};

// os,cpu毎にタスク作成
packageJson.os.map((os) => packageJson.cpu.map((cpu) => {

    const
        base = "{os}-{cpu}".replace(/{os}/, os).replace(/{cpu}/, cpu),
        names = {
            "clean-package": taskName("clean-package-{base}".replace(/{base}/, base)),
            "package": taskName("package-{base}".replace(/{base}/, base)),
            "clean-zip": taskName("clean-zip-{base}".replace(/{base}/, base)),
            "zip": taskName("zip-{base}".replace(/{base}/, base))
        },
        packagePath = "{out-dir}/{name}-{os}-{cpu}".
            replace(/{out-dir}/, config["out-dir"]).
            replace(/{name}/, packageJson.name).
            replace(/{os}/, os).
            replace(/{cpu}/, cpu),
        zipName = config["zip-name-temp"].
            replace(/{name}/, packageJson.name).
            replace(/{os}/, os).
            replace(/{cpu}/, cpu),
        zipPath = "{out-dir}/{name}".
            replace(/{out-dir}/, config["out-dir"]).
            replace(/{name}/, zipName);

    // ベースタスク名のストック
    taskNames["clean-package"].push(names["clean-package"]);
    taskNames.package.push(names.package);
    taskNames["clean-zip"].push(names["clean-zip"])
    taskNames.zip.push(names.zip);

    // clean-package
    gulp.task(names["clean-package"], (done) => del([packagePath], () => done()));

    // package
    gulp.task(names.package, [names["clean-package"]], () => packager({
        "arch": cpu,
        "asar": true,
        "dir": ".",
        "ignore": config["ignore-list"],
        "name": packageJson.name,
        "out": config["out-dir"],
        "platform": os
    }));

    // clean-zip
    gulp.task(names["clean-zip"], (done) => del([zipPath], () => done()));

    // zip
    gulp.task(names.zip, [names.package, names["clean-zip"]], () => gulp.
        src([packagePath + "/**/*"], {"src": packagePath}).
        pipe(zip(zipName)).
        pipe(gulp.dest(config["out-dir"])));

}));

gulp.task(taskName("package"), taskNames.package);
gulp.task(taskName("zip"), taskNames.zip);
