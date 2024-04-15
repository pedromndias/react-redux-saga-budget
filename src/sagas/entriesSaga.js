import { call, fork, put, take } from "redux-saga/effects";
import entriesTypes from '../actions/entries.actions'
import axios from 'axios'
import types from "../actions/entries.actions";

export function* getAllEntries(){
  yield take(entriesTypes.GET_ENTRIES)
  const result = yield call(axios, 'http://localhost:3001/entries')
  console.log(result);
  yield put({type: entriesTypes.POPULATE_ENTRIES, payload: result.data})
}

export function* getEntryDetails(id) {
  const {data} = yield call(axios, `http://localhost:3001/values/${id}`)
  console.log(data);
  yield put({type: entriesTypes.POPULATE_ENTRY_DETAILS, payload: {id, entry:data}})
}

export function* getAllEntriesDetails() {
  const {payload} = yield take(entriesTypes.POPULATE_ENTRIES)
  for (let i = 0; i < payload.length; i++) {
    const entry = payload[i];
    yield fork(getEntryDetails, entry.id)
  }
}