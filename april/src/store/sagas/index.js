import { all } from 'redux-saga/effects'
import { watchGunDogs } from './gunDogSagas'
import { watchAuth } from './authSaga'

export default function* rootSaga() {
  yield all(
    watchGunDogs.flat().map(
      f => f()
    ).concat(
      watchAuth()
    )
  )
}
