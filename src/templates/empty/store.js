import { observable } from 'mobx'


export default class ErrorStore {
  @observable message = ''

  @observable open = false
}
