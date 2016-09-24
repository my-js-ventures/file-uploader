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

var Files = [];

function Item(file) {

  this.file = file;
  this.name = file.name;

  var _size = file.size;
  var _progress = 0;

  Object.defineProperties(this, {
    progress: {
      set: function (v) { _progress = Math.ceil(v / _size * 10000) / 100},
      get: function () { return _progress }
    },
    size: {
      get: function () { return _size }
    }
  });

}

function uploadItem(item, index, options) {

  uploadFile(
    item.file,
    options.target,
    function (p) {
      if (p.lengthComputable) {
        item.progress = p.loaded;
        options.onProgress(Files);

        if (item.progress == 100) {
          Files.splice(index, 1);
        }

        if (Files.length == 0) {
          options.onEnd();
        }
      }
    },
    options.onError
  );
}

function selectFile(event, options) {

  var files = event.target.files || event.dataTransfer.files;
  var i;

  if (files) {

    for (i = 0; i < files.length; ++i) {
      assertAllowedTypes(options.allowedTypes, files[i].type);
      Files.push(new Item(files[i]));
    }

    options.onStart(Files);

    for (i = 0; i < Files.length; ++i) {
      uploadItem(Files[i], i, options);
    }

    event.target.value = '';
  }

}

module.exports = function (input, options) {

  var stub = function () {};
  var defaultOptions = {
    allowedTypes: [],
    onEnd: stub,
    onError: stub,
    onProgress: stub,
    onStart: stub,
    target: ''
  };

  options = Object.assign({}, defaultOptions, options);

  input.addEventListener('change', function (event) {
    selectFile(event, options);
  }, false);

};
