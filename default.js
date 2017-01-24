window.addEventListener('load', () => {
  let $content = document.querySelector('#content');
  navigator.serviceWorker.register('/service-worker.js', {
    scope: '/',
    origins: ['*']
  }).then(() => {
    $content.innerHTML = 'Worker registered';
  });
});