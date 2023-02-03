import { put, takeLatest, select } from 'redux-saga/effects';
import { fieldSizeSelector, heroLocationSelector, heroMove, heroMoveEnd, moveToSelector } from 'homam/modules/store/store';
import { delay, step } from 'homam/modules/store/middleware';
import { isSameLocation } from 'homam/modules/utils';

// TODO: better types for sagas

function* moveHero(): Generator<any> {
  const moveTo: any = yield select(moveToSelector);
  if (!moveTo) {
    return;
  }

  const stepSize: any = yield select(fieldSizeSelector);
  const location: any = yield select(heroLocationSelector);
  const newLocation = step(stepSize, location, moveTo);

  yield put(heroMove(newLocation));
  if (isSameLocation(moveTo, newLocation)) {
    yield put(heroMoveEnd());
  }

  yield delay(400);
  yield moveHero();
}

function* rootSaga() {
  yield takeLatest('game/heroMoveStart', moveHero);
}

export default rootSaga;
