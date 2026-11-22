// Older browsers can still reveal the destination after a project switch.
if (!('onpagereveal' in window) && document.referrer) {
  const previous = new URL(document.referrer);
  const current = new URL(location.href);
  const sourceFile = current.pathname.endsWith('/retail.html') ? 'index.html' : 'retail.html';
  const source = new URL(sourceFile, current);
  const fromHomeDirectory = sourceFile === 'index.html' && previous.pathname === new URL('.', current).pathname;
  if (previous.origin === current.origin && (previous.pathname === source.pathname || fromHomeDirectory)) {
    document.documentElement.classList.add('project-arrival');
  }
}
