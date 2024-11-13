import { all, fork } from 'redux-saga/effects';
import taskSaga from '../features/tasks/taskSaga';
import userSaga from '../features/users/userSaga';

export default function* rootSaga() {
  yield all([fork(taskSaga), fork(userSaga)]);
}
