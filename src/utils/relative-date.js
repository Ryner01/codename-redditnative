import moment from 'moment';

module.exports = (value) => {
  return moment.unix(value).fromNow();
};
