const
    config = require("../config").zip,
    del = require("del"),
    gulp = require("gulp"),
    packElec = require("./package-electron"),
    packageJson = require("./package-json-data"),
    zip = require("gulp-zip");

const
    inputPathTemp = "{input-path}/{name}-{os}-{cpu}/**".
        replace(/{input-path}/, config["input-path"]).
        replace(/{name}/, packageJson.name),
    taskNameTemp = "zip:{os}-{cpu}";

gulp.task("zip:clean", (done) => del([config["output-dir"]], () => done()));

const taskNames = packageJson.os.map((os) => {

    const
        packageTaskName = packElec.taskName.replace(/%s/, os);

    return packageJson.cpu.map((cpu) => {

        const
            inputPath = inputPathTemp.replace(/{os}/g, os).replace(/{cpu}/, cpu),
            outputPath = config["out-path-temp"].replace(/{os}/, os).replace(/{cpu}/, cpu),
            taskName = taskNameTemp.replace(/{os}/, os).replace(/{cpu}/, cpu);
        gulp.task(
            taskName, [
                "zip:clean",
                packageTaskName
            ],
            () => gulp.src([inputPath], {"src": inputPath}).
                pipe(zip(outputPath)).
                pipe(gulp.dest(config["output-dir"]))
        );

        return taskName;

    });

}).reduce((prev, current) => prev.concat(current), []);

gulp.task("zip", taskNames);
