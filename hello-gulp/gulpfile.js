var gulp = require("gulp");

gulp.task("a", (done)=>{
  console.log("a");
  done();
});

gulp.task("b", (done)=>{
  console.log("b");
  done();
});

gulp.task("default", gulp.series("a","b",(done)=>{
  console.log("default");
  done();
}));

// gulp.task("default", () => {
//   console.log("Hello Gulp!");
// });


