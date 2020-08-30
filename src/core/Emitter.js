export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // уведомляем слушателей если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // подписываемся на уведомления
  // добавляем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// пример работы эмиттера
// const emitter = new Emitter()

// const unsub = emitter.subscribe('vladilen', data => console.log('sub', data))

// setTimeout(() => {
//   emitter.emit('vladilen', 'after 2 sec')
// }, 2000)

// setTimeout(() => {
//   unsub()
// }, 3000)

// setTimeout(() => {
//   emitter.emit('vladilen', 'after 4 sec')
// }, 4000)
