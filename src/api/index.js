import user from './user';
import utils from './utils';
import file from './file';
import project from './project';

function merge(...sources) {
  return Object.assign({}, ...sources);
}
const $api = merge(
  user, utils, file, project,
);

export default $api;
