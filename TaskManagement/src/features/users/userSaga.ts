import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUsers } from '../../api/userApi';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from './userSlice';
import { User } from '../../interface/TaskUserInterface';

function* fetchUsersSaga() {
  try {
    const users: User[] = yield call(fetchUsers);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure('Failed to fetch users.'));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
}
