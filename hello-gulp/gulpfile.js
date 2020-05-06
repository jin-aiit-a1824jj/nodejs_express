var gulp = require("gulp");
var del = require("del");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("copy", (done)=>{
  gulp.src("./src/sample1.txt").pipe(gulp.dest("./dist"));
  done();
});

gulp.task("delete", (done)=>{
    del(["./dist/*"], {force: true})
      .then((res)=>{
        console.log("success->  " + res);
        done();
      })
      .catch((err)=>{
        console.log("failure->  " +err);
        done();
      });
});

gulp.task("rename", (done)=>{
  gulp.src("./src/sample1.txt")
  //.pipe(rename("hoge.txt"))
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("concat",(done)=>{
  gulp.src(["sample1.txt", "sample2.txt"],{ cwd: "./src"})
  .pipe(concat("bundle.txt"))
  .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("minify",(done)=>{
  gulp.src("./src/source1.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("concat-minify-rename",(done)=>{
  gulp.src(["source1.js", "source2.js"],{ cwd: "./src"})
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("a", (done)=>{
  console.log("a");
  done();
});

gulp.task("b", (done)=>{
  console.log("b");
  done();
});

gulp.task("default", gulp.series("copy","delete","rename","concat", "minify", "concat-minify-rename", "a","b",(done)=>{
  console.log("default");
  done();
}));

// gulp.task("default", () => {
//   console.log("Hello Gulp!");
// });


