import { put, takeLatest } from 'redux-saga/effects';
import { fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure } from './taskSlice';

function* fetchTasksSaga() {
  try {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks') || '[]');
    yield put(fetchTasksSuccess(tasksFromLocalStorage));
  } catch (error) {
    yield put(fetchTasksFailure());
  }
}

export default function* taskSaga() {
  yield takeLatest(fetchTasksRequest.type, fetchTasksSaga);
}
