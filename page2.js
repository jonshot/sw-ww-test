window.addEventListener('load', () => {
  let $content = document.querySelector('#content');
  let worker = new SharedWorker('web-worker.js');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      $content.innerHTML = `Service worker message: ${event.data} `;
      event.ports[0].postMessage('Message received by page2');
    });
  }

  worker.port.start();

  worker.port.addEventListener('message', event => {
    $content.innerHTML = `Web worker message: ${event.data}`;
  });

});