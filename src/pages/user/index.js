import detail from '../profile/detail'
import list from './list'
import initial from './initial'
import { User } from 'freenit'


export default {
  detail,
  initial,
  list,
  service: User.service,
  store: User.store,
}
