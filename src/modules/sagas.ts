import { put, takeLatest, select } from 'redux-saga/effects';
import { heroMove, heroMoveEnd, heroSelector, moveToSelector } from 'homam/modules/store/store';
import { isSameLocation } from 'homam/modules/utils';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// TODO: better types for sagas

function* moveHero(): Generator<any> {
  const moveTo: any = yield select(moveToSelector);
  if (!moveTo) {
    return;
  }

  const hero: any = yield select(heroSelector);

  const newLocation = hero.path.fields[0];

  yield put(heroMove(newLocation));
  if (hero.stepsLeft <= 1 || isSameLocation(moveTo, newLocation)) {
    yield put(heroMoveEnd());
  }

  yield delay(400);
  yield moveHero();
}

function* rootSaga() {
  yield takeLatest('game/heroMoveStart', moveHero);
}

export default rootSaga;
