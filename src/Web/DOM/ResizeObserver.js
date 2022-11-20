"use strict"

export const resizeObserver = cb => () => {
  return new ResizeObserver(
    (entries, observer) => { 
      cb(entries)(observer)()
    }
  )
}

export const _observe = 
  config => observer => element => () => 
    observer.observe(element, config)
  
export const unobserve = 
  observer => element => () => 
    observer.unobserve(element)

export const disconnect = 
  observer => () => observer.disconnect()
