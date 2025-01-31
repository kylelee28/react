import React, { memo } from "react"
import createEventEmitter from "shared/lib/EventEmitter"

const MyReact = (function MyReact(){
  const memorizedStates = []
  let deps = []
  const isInitialized = [];
  let cursor = 0;
  const cleanups = []
  
  function useState(initalValue = ""){
    const { forceUpdate } = useForceUpdate()
    
    if(!isInitialized[cursor]){
      memorizedStates[cursor] = initalValue
      isInitialized[cursor] = true
    }
    const state = memorizedStates[cursor]
    
    const setStateAt = (_cursor) => (nextState) => {
      if(state === nextState) return;

      memorizedStates[_cursor] = nextState;
      forceUpdate();
    }
    const setState = setStateAt(cursor)

    console.log(memorizedStates, "dd", cursor)
    cursor = cursor + 1

    return [state, setState]
  }

  
  function useForceUpdate(){
    const [value, setValue] = React.useState(1)

    const forceUpdate = () => {
        setValue(value + 1)
        cursor = 0;
      }

    return {forceUpdate}
  }

  
  function useEffect(effect, nextDeps){

    function runDedeferedEffect(){
      function runEffect() {
        const cleanup = effect()
        if(cleanup) cleanups[cursor] = cleanup
      }
      const ENOUGH_TIME_TO_RENDER = 1
      setTimeout(runEffect, ENOUGH_TIME_TO_RENDER)
    }


    if(!isInitialized[cursor]){
      isInitialized[cursor] = true;
      deps[cursor] = nextDeps;
      cursor = cursor + 1
      runDedeferedEffect()
      return;
    }

    const prevDeps = deps[cursor]
    const depsSame = prevDeps.every((prevDep, index) => prevDep === nextDeps[index])

    if(depsSame) {
      cursor = cursor + 1
      return;
    } 
    
    deps[cursor] = nextDeps;

    console.log(deps[cursor], "머지")

    cursor = cursor + 1
    runDedeferedEffect()
  }

  function resetCursor(){
    cursor = 0;
  }

  function cleanupEffects(){
    cleanups.forEach(cleanup => typeof cleanup === 'function' && cleanup())
  }


  function createContext(initialValue) {
    const emitter = createEventEmitter(initialValue)

    function Provider({value, children}) {
        React.useEffect(()=> {
          emitter.set(value)
        }, value)
        return <>{children}</>
    }
    return {
      Provider,
      emitter
    }
  }

  function useContext(context){
    const [value, setValue] = React.useState(context.emitter.get())

    React.useEffect(()=>{
      context.emitter.on(setValue)
      return () => context.emitter.off(setValue)
    }, [context])

    return value;
  }

  function useRef(initialValue) {
    if(!isInitialized[cursor]){
      memorizedStates[cursor] = { current : initialValue }
      isInitialized[cursor] = true;
    }
    const memorizedState = memorizedStates[cursor]
    cursor = cursor + 1;
    return memorizedState
  }

  
  return {useState, useEffect, resetCursor, cleanupEffects, useContext, createContext, useRef}

})();

export default MyReact

