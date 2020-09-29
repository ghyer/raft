module.exports = function (that, port, introducerPort) {
    that.list = [];
    that.logSet = [];
    that.termId = 0;
    that.port = port;
    that.voteCnt = 0;
    that.voteList = {};
    that.index = 0;
    that.logCommitCnt = {};
    that.logCommitFlag = {};
    that.list.push({port: port});
    that.tellIntroducer(port, introducerPort);
}