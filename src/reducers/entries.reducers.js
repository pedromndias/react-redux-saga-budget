import entriesTypes from '../actions/entries.actions'

//? Note how the reducer is a pure function. Same state and same action should always output the same result, no side effects.
const reducer =  (state = initialEntries, action) => {
  let newEntries
  switch (action.type) {
    case entriesTypes.POPULATE_ENTRIES:
      return action.payload
    case entriesTypes.ADD_ENTRY:
      newEntries = state.concat({...action.payload})
      return newEntries
    case entriesTypes.REMOVE_ENTRY:
      newEntries = state.filter(entry => entry.id !== action.payload.id)
      return newEntries
    case entriesTypes.POPULATE_ENTRY_DETAILS:
    case entriesTypes.UPDATE_ENTRY:
      newEntries = [...state];
      const index = newEntries.findIndex(entry => entry.id === action.payload.id)
      newEntries[index] = { ...newEntries[index], ...action.payload.entry}
      return newEntries
    default:
      return state
  }
}

export default reducer

let initialEntries = [];