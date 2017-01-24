window.addEventListener('load', () => {
  let $content = document.querySelector('#content');
  let $msg = document.querySelector('#msg');
  let $btn = document.querySelector('#btn');
  let $workerBtn = document.querySelector('#workerBtn');
  let worker = new SharedWorker('web-worker.js');

  worker.port.start();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
      origins: ['*']
    });
  }

  $btn.addEventListener('click', () => {
    let msg = $msg.value;

    new Promise(resolve => {
      let channel = new MessageChannel();
      channel.port1.addEventListener('message', event => resolve(event.data));
      navigator.serviceWorker.controller.postMessage(msg, [channel.port2]);
    });
  });

  $workerBtn.addEventListener('click', () => {
    worker.port.postMessage($msg.value);
  });

});