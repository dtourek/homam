import { put, takeLatest, select } from 'redux-saga/effects';
import { heroMove, heroMoveEnd, moveToSelector, pathSelector } from 'homam/modules/store/store';
import { isSameLocation } from 'homam/modules/utils';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// TODO: better types for sagas

function* moveHero(): Generator<any> {
  const moveTo: any = yield select(moveToSelector);
  if (!moveTo) {
    return;
  }

  const path: any = yield select(pathSelector);

  const newLocation = path.fields[0];

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
