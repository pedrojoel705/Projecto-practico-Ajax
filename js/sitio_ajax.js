const $main = document.querySelector('main');

const getHTML = async () => {
  try {
    let res = await axios.get('assets/home.html');
    let json = await res.data;
    console.log(json, res);

    $main.innerHTML = json;
  } catch (err) {
    let message = err.message || 'Ocurrió un error';
    $main.insertAdjacentHTML('afterend', `Error ${err.status}: ${message}`);
  }
};
document.addEventListener('click', async (e) => {
  if (e.target.matches('.menu a')) {
    e.preventDefault();
    try {
      res = await axios(e.target.href);
      json = res.data;
      $main.innerHTML = json;
    } catch (err) {
      let message = err.message || 'Ocurrió un error';
      $main.insertAdjacentHTML('afterend', `Error ${err.status}: ${message}`);
    }
  }
});

document.addEventListener('DOMContentLoaded', getHTML());
