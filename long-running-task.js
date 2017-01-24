self.addEventListener('message', () => longRunningTask());

function longRunningTask() {
  setTimeout(() => {
    self.postMessage('Task complete');
  }, 5000);
}