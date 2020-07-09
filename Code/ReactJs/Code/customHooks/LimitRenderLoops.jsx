/** Does not allow watchedValue to cause more than n amount of renders in n seconds.
 * This works as a safe-guard against render-loops.
 */
const useLimit = (watchedValue, errorMessage, seconds=2, maxRenders=5) => {
  const rendersQueued = useRef(0)
  const allowSetState = useRef(true)
  useEffect(
    () => {
      if(allowSetState.current){
        rendersQueued.current += 1
        setTimeout(() =>{ rendersQueued.current -= 1 }, seconds*1000)
        if(rendersQueued.current > maxRenders ) {
          allowSetState.current = false
        }
      } else {
        console.error(errorMessage)
      }
    },
    [watchedValue],
  );
  return { allowSetState: allowSetState.current }
}

/* Here is how we use the hook, can be used in a component or custom hook: */
export function useCustomHook (values) {
  const [ state, setState ] = useState(values)
  const { allowSetState } = useLimit(initialValues, "too many renders")
  useEffect(
    () => {
      if(allowSetState) {
        setState(values) // we want to react to changes in 'values' prop/parameter
        // but if 'values' changes with every render then 'setState' will also be
        // called on every render, creating a render loop.
      }
    },
    [values],
  );
  return someOperationOnValues(values)
}

/** In this custom hook the parent should pass a stable reference as 'values'.
 * if the parent component sends a new reference for "values" on every render then
 * it will create a render loop and the app will become unresponsive. So useLimit
 * can be used as a guard against this mis-use of useCustomHook.
 */