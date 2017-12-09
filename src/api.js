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
