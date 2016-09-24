function startFunction() {
  console.log('started');
}

function endFunction() {
  console.log('finished');
}

function errorFunction() {
  console.log('error');
}

function progressFunction(files) {

  files.forEach(function (file) {
    console.log(file.name, file.progress);
  });

}

FileUploader(
  document.querySelector('input[type=file]'),
  {
    target: './target.php',
    onProgress: progressFunction,
    onError: errorFunction,
    onEnd: endFunction,
    onStart: startFunction,
    allowedTypes: [
      'text/plain',
      'image/png',
      /^video\//
    ]
  }
);
