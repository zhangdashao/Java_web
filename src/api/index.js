import user from './user'
import utils from './utils'

function merge(...sources) {
  return Object.assign({}, ...sources)
}
const $api = merge(
  user, utils
)

export default $api;