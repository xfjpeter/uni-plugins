/**
 * 启动一个微任务。
 *
 * 该函数旨在兼容不同环境下的微任务调度。微任务是一种在主任务（如事件循环中的回调）之后，但在下一次渲染之前执行的JavaScript任务。
 * 它们对于异步编程和性能优化非常重要。此函数尝试使用三种不同的方法来调度微任务，取决于环境的支持情况。
 *
 * @param {Function} callback - 待执行的微任务回调函数。
 */
export function startMicroTask(callback) {
  // 如果队列微任务是可用的，直接使用队列微任务的方法来调度回调。
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(callback)
  } else if (typeof MutationObserver === 'function') {
    // 如果MutationObserver可用，使用它来创建一个微任务。
    // 这是一种旧的兼容性方法，因为MutationObserver在较早的浏览器版本中就已经支持。
    const node = document.createElement('div')
    const observer = new MutationObserver(callback)
    observer.observe(node, { childList: true })
    node.textContent = 'xfjpeter'
  } else {
    // 如果以上两种方法都不可用，退回到使用setTimeout来模拟微任务。
    // 这是最后的选择，因为setTimeout不是真正的微任务，但它可以在不支持微任务的环境中提供类似的功能。
    setTimeout(callback, 0)
  }
}

/**
 * 函数节流器。
 * 通过限制函数调用的频率，防止在高频率事件（如窗口滚动或鼠标移动）中过多调用给定的函数，从而优化性能。
 *
 * @param {Function} fn 要节流的函数。
 * @param {number} delay 延迟的毫秒数，在这段时间内只能调用一次给定的函数。
 * @returns {Function} 返回一个新的节流函数，它将控制原始函数的调用频率。
 */
/**
 * 函数节流器
 * @param {Function} fn 要节流的函数
 * @param {number} delay 延迟的毫秒数
 * @returns {Function} 返回节流后的函数
 */
export function throttle(fn, delay) {
  // 用于存储定时器ID
  let timeoutId
  // 用于记录上一次函数执行的时间
  let lastExecuted = 0

  // 返回一个节流函数
  return function () {
    // 保存当前上下文和参数
    const context = this
    const args = arguments
    // 获取当前时间
    const now = Date.now()
    // 计算剩余时间
    const remaining = delay - (now - lastExecuted)

    // 实际执行函数的内部函数
    function execute() {
      lastExecuted = now
      // 在当前上下文中调用原始函数，并传入参数
      fn.apply(context, args)
    }

    // 如果剩余时间小于等于0，表示可以执行函数
    if (remaining <= 0) {
      // 如果存在定时器，则清除定时器
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      // 执行函数
      execute()
    } else {
      // 如果不存在定时器，则设置定时器
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          timeoutId = null
          // 执行函数
          execute()
        }, remaining)
      }
    }
  }
}

/**
 * 函数防抖动封装。
 * 函数防抖（debounce）是指在事件被触发n秒后，才执行回调，如果在这n秒内事件又被触发，则重新计时。
 * 主要用于限制函数调用的频率，常用于输入事件处理函数（如输入框的keyup事件）和窗口大小调整事件等。
 *
 * @param {Function} fn 需要被延迟执行的函数。
 * @param {number} delay 延迟执行的时间，单位为毫秒。
 * @returns {Function} 返回一个经过防抖动处理的函数。
 */
export function debounce(fn, delay) {
  // 用于存储定时器的变量
  let timer = null

  // 返回一个封装函数
  return function () {
    // 如果定时器存在，则清除之前的定时器
    if (timer) clearTimeout(timer)

    // 设置新的定时器，延迟执行原函数
    timer = setTimeout(() => {
      // 使用apply确保函数在正确的上下文中执行，并传递所有参数
      fn.apply(this, arguments)
    }, delay)
  }
}
