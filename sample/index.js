function progressFunction(progress) {

  document.querySelector('input[type=text]').value = progress;

}

const target = './target.php';

FileUploader(
  document.querySelector('input[type=file]'),
  target,
  progressFunction
);
