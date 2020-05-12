import BaseService from './BaseService'

export default class PokeService extends BaseService {
  constructor () {
    super('/pokemon')
  }
}
