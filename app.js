function state(initialValue) {
  let myInitialState = initialValue
  return [
    this.defaultState = myInitialState,
    function () {
      return this.defaultState
      
    },
    function (next) {
      this.defaultState=next
      myInitialState=next
    },
    myInitialState
  ]
}

let [defaultState,get, setSate, value] = state(8)


console.log(defaultState)
setSate(3232)
console.log(defaultState, get())