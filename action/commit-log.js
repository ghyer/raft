function commitLog(that, data) {
    that.logSet.push(data);
}

module.exports = commitLog;