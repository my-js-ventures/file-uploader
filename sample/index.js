function progressFunction(progress) {

  document.querySelector('input[type=text]').value = progress;

}

FileUploader(
  document.querySelector('input[type=file]'),
  {
    target: './target.php',
    onProgress: progressFunction
  }
);
