/*
 * # r
 * ## `r`
 *
 * (_ -> a) -> a
 *
 * _`fn`_ - a function that uses a property of `r`
 *
 * If the function is asynchronous, it has to return a Promise.
 * `fn` is executed imidiatly once and then every time a property
 * of `r` changes that was used inside `fn` at the first time it
 * was executed. `r(fn)` returns the return value of `fn`. These
 * Functions may be asyncronous, they cannot be registered
 * concurrently. Later asyncronous functions will be executed
 * concurrently, but due to the simplistic design of the
 * function registration process, they cant on the first time
 * are run. So when you do register multiple asyncronous functions
 * in sequence, that should be done using a chain of promises.
 *
 * ## `r.__proto__`
 *
 * The prototype of `r` is the proxy which controlls the dataflow.
 *
 * ## `r.`
 *
 * All other properties may be used to save reactive values.
 */

module.exports = (init = {}) => {
  // The recorder is used when a reactive function is run for
  // the first time. During that run, the names of all properties
  // wich are read from the proxy (r.prototype) will be stored
  // inside the recorder array.
  let recorder = null

  // ---------- HELPERS ----------
  const isPromise = Promise.prototype.isPrototypeOf

  // To guard against infinite loops every function gets an id.
  // When a property is set within a reactive function, only the
  // denpendants with ids not currently in `running` are run.
  const id = (() => {
    let curr = 0
    return () => ++curr
  })()

  // --------- /HELPERS ----------

  const running = (() => {
    // When a reactive function is running, its ID is pushed to this
    // array. When the run is done, it is removed again.
    let running = []
    return [
      rf => {
        // Register `rf` as running and save the index in `i`
        const i = running.push(rf[0])

        let clean = _ => running = running.splice(i, 1)

        // For `i` to be save, the `run` can never fail.
        // AFAIK the way I implemented this, that's the case.
        // `running` may change while the reactive function is run.
        // But because the running array can only be accesed by
        // this function it's save to assume, that the ids that were
        // added while the reactive function was run, are now gone.
        if(rf[2]) {
          rf[1]()
            .then(clean)
            .catch(clean)
        } else {
          rf[1]()
          clean()
        }
      },
      rf => running.indexOf(rf[0]) === -1
    ]
  })()

  // Pushed the id of `rf` to `running` which is protected by a
  // closure.
  const run = running[0]

  // Checks if the id of the reactive function that is passed, is
  // inside the protected `running` array.
  const notRunning = running[1]

  // Stores dependencies `{ propA: [[34, fn1], [47, fn2]] }`
  const store = {}

  // Holds default values `{ propA: default }`.
  // The default value is used when the property has been deleted.
  // This guarantees a certain safety.
  const cache = {}

  // This is used as the prototype of the object that is returned.
  // Using this method I can have the returned object be a function
  // and an object at the same time.
  const proxy = new Proxy (init, {
    get (target, property, reciever) {
      // If a recoring is beein made, push the property name to it.
      if(recorder) recorder.push(property)
      return (
        property in target
          ? target[property]
          // If the property doesn't exist use the cache
          : cache[property]
      )
    },
    set (target, property, value, reciever) {
      // Set the property
      target[property] = value
      // If cached yet, cache it.
      if(!cache[property]) cache[property] = value
      // Run all reactive functions using `run`
      ;(store[property] || []).filter(notRunning).forEach(run)
      // Always return true
      return true
    }
  })

  // Runs a reactive function, records it's dependencies and
  // registers them inside store
  const register = fn => {
    // Generate the id for the function
    const rf = [id(), fn]
    // Register deps and clear recorder
    const clean = (isPromise) => {
      rf.push(isPromise)
      recorder
        // Remove duplicates from `recoder`
        .reduce((mem, el) => mem.indexOf(el) > -1
          ? mem
          : mem.concat(el),
          []
        )
        // Loop over the remaining recoderd property names
        .forEach(el => {
          // Register the dependants with their ids
          store[el] = store[el]
            ? store[el].concat([rf])
            : [rf]
        })
      // Clear the recorder
      recorder = null
    }
    // Initialize the recoreder
    recorder = []
    // Run the reactive function
    let ret = fn()
    // When the function returns a promise, register it as such
    if(isPromise(ret)) {
      ret
        .then(_ => clean(true))
        .catch(_ => clean(true))
    } else {
      clean(false)
    }
    return ret
  }

  // The exported function
  const r = x => {
    // Register `x` if it's a function
    if(typeof x === 'function') {
      return register(x)
    } else {
      throw new Error('What? Why? What is this?')
    }
  }
  r.__proto__ = proxy
  return r
}

