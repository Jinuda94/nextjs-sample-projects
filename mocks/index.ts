async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
}

console.log('발동');
initMocks();

export {};
