function uploadFile(file, target, progressFn, errorFn) {

  var xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', progressFn);
  xhr.onerror = errorFn;

  xhr.open('PUT', target, true);
  xhr.send(file);

}

function selectFile(event, options) {

  var files = event.target.files || event.dataTransfer.files;

  if (files) {

    var file = files[0];
    var size = file.size;

    uploadFile(
      file,
      options.target,
      function (p) {
        if (p.lengthComputable) {
          options.onProgress(Math.ceil(p.loaded / size * 10000) / 100);
        }
      },
      options.onError
    );

    event.target.value = '';
  }

}

module.exports = function (input, options) {

  var stub = function () {};
  var defaultOptions = {
    onProgress: stub,
    onError: stub,
    target: ''
  };

  options = Object.assign({}, defaultOptions, options);

  input.addEventListener('change', function (event) {
    selectFile(event, options);
  }, false);

};
