// Imports

var gulp = require('gulp');
var sass = require('gulp-sass');
var styleguide = require('sc5-styleguide');

// Path definitions

var sourcePath = 'assets';
var htmlWild = sourcePath + '/**/*.html';
var styleSourcePath = sourcePath + '/styles';
var scssWild = styleSourcePath + '/**/*.scss';
var scssRoot = styleSourcePath + '/main.scss';
var overviewPath = styleSourcePath + '/README.md';

var buildPath = 'static-sg';
var styleBuildPath = buildPath + '/styles';
var styleguideAppRoot = '/styleguide';
var styleguideBuildPath = buildPath + styleguideAppRoot;

var tmpPath = 'dev-area';
var styleguideTmpPath = tmpPath + '/styleguide/';


// Building styleguide for static hosting to be displayed as a part of the application
//
// Here we build the styleguide so it can be included in a web folder within the app.
// The benefit for including the styleguide at /styleguide path of the app is that
// everyone can always find a master copy of the style guide. Another benefit is that
// this copy will be load balanced by the web server, so it can handle heavy loads.
// All interactive features are disabled to prevent users from tampering with the
// styles.

gulp.task('staticStyleguide:generate', function() {
  return gulp.src(scssWild)
    .pipe(styleguide.generate({
        title: 'My First Hosted Styleguide',
        rootPath: styleguideBuildPath,
        appRoot: styleguideAppRoot,
        overviewPath: overviewPath,
        disableEncapsulation : true
      }))
    .pipe(gulp.dest(styleguideBuildPath));
});

gulp.task('staticStyleguide:applystyles', function() {
  return gulp.src(scssRoot)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleguideBuildPath));
});

gulp.task('staticStyleguide', ['staticStyleguide:generate', 'staticStyleguide:applystyles']);

// Running styleguide development server to view the styles while you are working on them
//
// This task runs the interactive style guide for use by developers. It runs a built-in server
// and contains all the interactive features and should be updated automatically whenever the
// styles are modified.

gulp.task('styleguide:generate', function() {
  return gulp.src(scssWild)
    .pipe(styleguide.generate({
        title: 'My First Development Styleguide',
        sideNav : true,
        server: false,
        port : 7000,
        rootPath: styleguideTmpPath,
        overviewPath: overviewPath,
        disableEncapsulation : true,
        parsers: {
          sass: 'scss',
          scss: 'scss',
          less: 'less',
          postcss: 'postcss'
        },
        extraHead: [
          '<link type="text/css" rel="stylesheet" href="dist/styles/main.css">'
        ],
        afterBody: [
          '<script src="dist/scripts/jquery.js"></script>',
          '<script src="dist/scripts/components.js"></script>',
          '<script src="dist/scripts/plugins.js"></script>',
          '<script src="dist/scripts/main.js"></script>',
          '<script src="dist/scripts/styleguide.js"></script>'
        ]
      }))
    .pipe(gulp.dest(styleguideTmpPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(scssRoot)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleguideTmpPath));
});

gulp.task('styleguideDist', function(){
  gulp.src(['dist/**/*']).pipe(gulp.dest('tmp/styleguide/dist'));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);





// Developer mode
gulp.task('sg-dev', ['styleguide'], function() {
    gulp.watch(htmlWild, ['html']);
    gulp.watch(scssWild, ['scss', 'styleguide']);
    console.log(
        '\nDeveloper mode!\n\nSC5 Styleguide available at http://localhost:3000/\n'
    );
});

gulp.task('styleguide-build', ['staticStyleguide'], function() {
    console.log(
        '\nBuild complete!\n\nFresh build available in directory: ' +
        buildPath + '\n\nCheckout the build by commanding\n' +
        '(cd ' + buildPath + '; python -m SimpleHTTPServer)\n' +
        'and pointing yout browser at http://localhost:8000/\n' +
        'or http://localhost:8000/styleguide/ for the styleguide\n\n' +
        'Run gulp with "gulp dev" for developer mode and style guide!\n'
    );
});

// The basic build task
