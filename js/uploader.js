const $main = document.querySelector('main');
const $files = document.getElementById('files');

/**
 * It takes a file, creates a new XMLHttpRequest object, creates a new FormData object, appends the
 * file to the FormData object, adds an event listener to the XMLHttpRequest object, opens a connection
 * to the server, sets the request header, and sends the FormData object to the server
 * @param file - The file to upload.
 */
const uploader = (file) => {
  //console.log(file);
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('file', file);

  xhr.addEventListener('readystatechange', (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 || xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      console.log(json);
    } else {
      let message = xhr.statusText || 'Ocurrio un Problema';
      xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });

  xhr.open('POST', 'assets/uploader.php');
  xhr.setRequestHeader('enc-type', 'multipart/form-data');
  xhr.send(formData);
};

/**
 * It creates a progress bar and a span element, then it reads the file as a dataURL, and then it
 * uploads the file to the server.
 * @param file - The file to be uploaded.
 */
const progressUpload = (file) => {
  const $progress = document.createElement('progress');
  const $span = document.createElement('span');

  $progress.value = 0;
  $progress.max = 100;

  $main.insertAdjacentElement('beforeend', $progress);
  $main.insertAdjacentElement('beforeend', $span);

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.addEventListener('progress', (e) => {
    //console.log(e);
    let progress = parseInt((e.loaded * 100) / e.total);
    $progress.value = progress;
    $span.innerHTML = `<b>${file.name}-${progress}%</b>`;
  });

  fileReader.addEventListener('loadend', (e) => {
    uploader(file);
    setTimeout(() => {
      $main.removeChild($progress);
      $main.removeChild($span);
      $files.value = '';
    }, 3000);
  });
};

document.addEventListener('change', (e) => {
  if (e.target === $files) {
    //console.log(e.target.files);

    const files = Array.from(e.target.files);
    files.forEach((el) => progressUpload(el));
  }
});
