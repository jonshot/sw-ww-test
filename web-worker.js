let ports = [];


function longRunningTask() {
  setTimeout(() => {
    self.postMessage('Task complete');
  }, 5000);
}

onconnect = event => {
  let port = event.ports[0];
  ports.push(port);
  port.addEventListener('message', event => {
    ports.forEach(port => {
      port.postMessage(event.data)
    });
  });
  port.start();
}