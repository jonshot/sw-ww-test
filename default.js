window.addEventListener('load', () => {
  let $content = document.querySelector('#content');
  let $msg = document.querySelector('#msg');
  let $btn = document.querySelector('#btn');
  let $sharedWorkerBtn = document.querySelector('#sharedWorkerBtn');
  let $taskBtn = document.querySelector('#taskBtn');
  let $taskProgress = document.querySelector('#taskProgress');
  let sharedWorker = new SharedWorker('web-worker.js');
  let worker = new Worker('long-running-task.js');

  sharedWorker.port.start();

  if ('servicesharedWorker' in navigator) {
    navigator.servicesharedWorker.register('/service-worker.js', {
      scope: '/',
      origins: ['*']
    });
  }

  $btn.addEventListener('click', () => {
    let msg = $msg.value;

    new Promise(resolve => {
      let channel = new MessageChannel();
      channel.port1.addEventListener('message', event => resolve(event.data));
      navigator.servicesharedWorker.controller.postMessage(msg, [channel.port2]);
    });
  });

  $sharedWorkerBtn.addEventListener('click', () => {
    sharedWorker.port.postMessage($msg.value);
  });

  $taskBtn.addEventListener('click', () => {
    worker.postMessage('Start');
    $taskProgress.innerHTML = 'Processing...';
  });

  worker.addEventListener('message', () => {
    $taskProgress.innerHTML = 'Task complete';
  });

});