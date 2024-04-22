// ? A saga uses a generator function, that allows it to return multiple values when called. We can enter and exit a function at anytime (yield points)
import {call, delay, put, take, takeEvery } from 'redux-saga/effects'

function double (num) {
  return num * 2
}

export function* testSaga() {
  while(true) {
    console.log("Start saga function");
    yield take('TEST_MESSAGE');
    const a = yield call(double, 2)
    console.log(a);
    const b = double(3)
    console.log(b);
    console.log("Finish saga function");
  }
}

export function* testSagaTakeEveryProcess({index}) {
  console.log(`Process for index ${index}`);
}

export function* testSagaTakeEvery() {
  const {index} = yield takeEvery('TEST_MESSAGE_3', testSagaTakeEveryProcess)
  console.log(`Finish takeEvery for index ${index}`);
}

export function* dispatchTest() {
  while(true) {
    yield delay(1000)
    yield put({type: 'TEST_MESSAGE'})
  }
}