# About rendering components on React

## Library that tells you why a component renders
https://github.com/welldone-software/why-did-you-render

## All about how react chooses to re-render a component
https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/

# Standard rendering behavior

queue a render by setting state
```
  this.setState()
  this.forceUpdate()
  useState
  useReducer
```
Re-render all child components. Prop changes are irrelevant.

# To save some renders

You can use:


`React.Component.shouldComponentUpdate`: Manually tell react if component should render

`React.PureComponent`: Shallow comparison of previous and current props and state to decide if re-render should happen

`React.memo()`: Shallow comparison with props to decide if re-render should happen

### Caveat

`Context providers`: updating their value re-renders everyone with their value. Does not care if only part of the value is used. Changing their value also re-renders the parent component that contains the state for the value.

`Redux's connect()`: HOC that works as a `PureComponent/memo()`

`Redux's useSelector`: Does not work like `connect()`, to avoid re-renders, manually use `PureComponent/memo()`.