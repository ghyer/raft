module.exports = function (that, data) {
    // Todo 安全性检查
    // if (data.lastLog)
    //     return false;
    let termId = data.termId;
    if (that.voteList[termId]) {
        return false;
    }
    that.voteList[termId] = true;
    return true;
}