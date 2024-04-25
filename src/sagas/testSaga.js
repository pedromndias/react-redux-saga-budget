// ? A saga uses a generator function, that allows it to return multiple values when called. We can enter and exit a function at anytime (yield points)
import {call, cancel, cancelled, delay, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects'

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
  console.log(`Starting process for index ${index}`);
  yield delay(3000)
  console.log(`Ending process for index ${index}`);
}

export function* testSagaTakeEvery() {
  const {index} = yield takeEvery('TEST_MESSAGE_3', testSagaTakeEveryProcess)
  console.log(`Finish takeEvery for index ${index}`);
}

export function* infinitySaga() {
  console.log("Starting infinity saga");
  let index = 0;
  while(true) {
    index++;
    try {
      console.log(`Inside infinity loop ${index}`);
      yield delay(1000)
    }
    catch(error) {
      console.log("An error happened: ", error);
    } 
    finally {
      console.log("The fork was cancelled?", yield cancelled());
    }
  }
  console.log("Ending infinity saga");
}

export function* testSagaCancelled() {
  yield take('TEST_MESSAGE_4');
  const handleCancel = yield fork(infinitySaga);
  yield delay(3000);
  yield cancel(handleCancel);
}

export function* testSagaTakeLatest() {
  yield takeLatest('TEST_MESSAGE_5', infinitySaga)
}

export function* dispatchTest() {
  let index = 0;
  // yield put({type: 'TEST_MESSAGE_5', payload: index})

  while(true) {
    yield delay(5000)
    yield put({type: 'TEST_MESSAGE_5', payload: index})
    index++
  }
}