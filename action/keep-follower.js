const ID = require('./ID');

module.exports = function (that, data) {
    if (that.identifier === ID.candidate) {
        if (data.termId >= that.termId) {
            clearInterval(that.heartbeatTimeId);
            that.becomeFollower();
        }
        return;
    }
    clearTimeout(that.heartbeatTimeId);
    that.becomeFollower();
}