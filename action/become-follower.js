const ID        = require('./ID');
const config    = require('./config');

module.exports = function (that) {
    that.identifier = ID.follower;
    that.heartbeatTimeId = setTimeout(() => {
        that.becomeCandidate();
    }, config.heartbeatTimeout);
}