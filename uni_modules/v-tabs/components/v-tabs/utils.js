export function startMicroTask(callback) {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(callback)
  } else if (typeof MutationObserver === 'function') {
    const node = document.createElement('div')
    const observer = new MutationObserver(callback)
    observer.observe(node, { childList: true })
    node.textContent = 'xfjpeter'
  } else {
    setTimeout(callback, 0)
  }
}
