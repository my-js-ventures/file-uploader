function ProgressBar() {

  var bar = document.createElement('div');
  bar.classList.add('bar');

  var meter = document.createElement('div');
  meter.classList.add('meter');
  meter.style.width = '0%';

  bar.appendChild(meter);

  this.bar = bar;

  Object.defineProperty(this, 'progress', {
    set: function (v) { meter.style.width = v + '%'; }
  });

}

var bars = [];

function startFunction(files) {

  var container = document.querySelector('.progress-container');

  files.forEach(function (file) {

    var progressBar = new ProgressBar();
    var uploadItem = document.createElement('div');

    bars.push(progressBar);

    uploadItem.appendChild(document.createTextNode(file.name));
    uploadItem.appendChild(progressBar.bar);

    container.insertBefore(uploadItem, container.firstChild);

  });

}

function endFunction() {
  console.log('finished');
}

function errorFunction() {
  console.log('error');
}

function progressFunction(files) {

  files.forEach(function (file, index) {
    bars[index].progress = file.progress;

    if(file.progress == 100) {
      bars.splice(index, 1);
    }
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
