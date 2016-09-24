module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'file-uploader.js',
    library: 'FileUploader',
    libraryTarget: 'umd'
  }
};
