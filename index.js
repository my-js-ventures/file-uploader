function uploadFile(file, target, progressFn, errorFn) {

  var xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', progressFn);
  xhr.onerror = errorFn;

  xhr.open('PUT', target, true);
  xhr.send(file);

}

function assertAllowedTypes(allowedTypes, type) {

  if (allowedTypes.length) {

    var found = false;

    for (var i = 0; i < allowedTypes.length && !found; ++i) {

      var allowedType = new RegExp(allowedTypes[i]);

      found = allowedType.test(type);

    }

    if (!found) {

      throw new TypeError('File type ' + type + ' not allowed.');

    }

  }

}

function selectFile(event, options) {

  var files = event.target.files || event.dataTransfer.files;

  if (files) {

    var file = files[0];
    var size = file.size;

    assertAllowedTypes(options.allowedTypes, file.type);

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
    allowedTypes: [],
    onProgress: stub,
    onError: stub,
    target: ''
  };

  options = Object.assign({}, defaultOptions, options);

  input.addEventListener('change', function (event) {
    selectFile(event, options);
  }, false);

};
