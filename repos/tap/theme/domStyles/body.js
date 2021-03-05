
// Add $ at the end because it's not a valid selector for an element
// So it gets treated as part of the class name
// It is useDomStyle it's used to to say
// "body" is an element selector, and not a class selector
export const body = theme => ({
  body$: {
    flexDirection: 'column',
    overflow: 'hidden'
  }
})