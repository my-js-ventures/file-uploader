function uploadFile(file, target, progressFn, errorFn) {

  var xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', progressFn);
  xhr.onerror = errorFn;

  xhr.open('PUT', target, true);
  xhr.send(file);

}

function selectFile(event, target, progressFn) {

  var files = event.target.files || event.dataTransfer.files;

  if (files) {

    var file = files[0];
    var size = file.size;

    uploadFile(
      file,
      target,
      function (p) {
        if(p.lengthComputable) {
          progressFn(Math.ceil(p.loaded / size * 10000) / 100);
        }
      },
      function (err) {
        console.log(err);
      }
    );

    event.target.value = '';
  }

}

module.exports = function (input, target, progress) {

  input.addEventListener('change', function (event) {
    selectFile(event, target, progress);
  }, false);

};
