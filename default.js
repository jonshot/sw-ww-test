window.addEventListener('load', () => {
  let $content = document.querySelector('#content');
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    $content.innerHTML = 'Worker registered';
  });
});