import { put, takeLatest, select } from 'redux-saga/effects';
import { fieldSizeSelector, heroLocationSelector, heroMove, heroMoveEnd, moveToSelector } from 'homam/modules/store/store';
import { delay, step } from 'homam/modules/store/middleware';
import { isSameLocation } from 'homam/modules/utils';

function* moveHero() {
  const moveTo = yield select(moveToSelector);
  if (!moveTo) {
    return;
  }

  const stepSize = yield select(fieldSizeSelector);
  const location = yield select(heroLocationSelector);
  const newLocation = step(stepSize, location, moveTo);
  yield put(heroMove(newLocation));

  if (isSameLocation(moveTo, newLocation)) {
    yield put(heroMoveEnd());
  }

  yield delay(100);
  yield moveHero();
}

function* rootSaga() {
  yield takeLatest('game/heroMoveStart', moveHero);
}

export default rootSaga;
