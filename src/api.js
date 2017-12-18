import firebaseClient from './firebaseClient'

import _ from 'lodash/string'

const normalizeText = (text = '') => _.snakeCase(text.toString()).toUpperCase()

const notEmpty = (...rest) => rest.forEach((string = '') => {
  if (!string.toString().length) {
    throw new Error('Empty values are not allowed')
  }
})

export const addUserDefinedState = (userId = '', name = '') => {
  const key = normalizeText(name)
  notEmpty(userId, name, key)
  const path = `${userId}/states/${key}`
  return firebaseClient.database().ref(path).set(name)
}

export const getUserDefinedStatesReference = userId => {
  notEmpty(userId)
  const path = `${userId}/states`
  return firebaseClient.database().ref(path)
}

export const deleteUserDefinedState = (userId, state) => {
  notEmpty(userId, state)
  const path = `${userId}/states/${state}`
  return firebaseClient.database().ref(path).set(null)
}

export const setUserItem = (userId, itemId, item) => {
  notEmpty(userId, itemId)
  const path = `${userId}/items/${itemId}`
  return firebaseClient.database().ref(path).set(item)
}

export const getUserItem = (userId, itemId) => {
  notEmpty(userId, itemId)
  const path = `${userId}/items/${itemId}`
  return firebaseClient.database().ref(path).once('value').then(snapshot => snapshot.val())
}
