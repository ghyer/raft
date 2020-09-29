const vote              = require('./action/vote');
const setList           = require('./action/set-list');
const offline           = require('./action/offline');
const peerInit          = require('./action/init');
const commitLog         = require('./action/commit-log');
const requestLog        = require('./action/request-log');
const becomeLeader      = require('./action/become-leader');
const keepFollower      = require('./action/keep-follower');
const IamIntroducer     = require('./action/I-am-introducer');
const tellIntroducer    = require('./action/tell-introducer');
const becomeFollower    = require('./action/become-follower');
const becomeCandidate   = require('./action/become-candidate');

class Peer {

    list;               // 集群列表
    port;               // 当前服务器port
    index;              // 日志索引号
    termId;             // 任期
    logSet;             // 日志集
    logCommitCnt;       // 日志提交的服务器数量
    identifier;         // 当前身份
    leaderPort;         // 领导者port
    heartbeatTimeId;    // 定期心跳包id
    voteCnt;            // 投票数
    voteList;           // 确保每台服务器针对一个任期只投出一张票
    voteTimeId;         // 投票timeout的id

    constructor(port, introducerPort) {
        console.log(port + ' initialing');
        peerInit(this, port, introducerPort);
    }
    tellIntroducer(port, introducerPort) {
        console.log(port + ' is trying to join group through ' + introducerPort);
        tellIntroducer(this, port, introducerPort)
    }
    becomeFollower() {
        console.log(this.port + ' becoming follower');
        becomeFollower(this);
    }
    IamIntroducer(port) {
        console.log(this.port + ' I am trying to introduce ' + port);
        return IamIntroducer(this,port);
    }
    setList(data) {
        console.log(this.port + " is trying to setData");
        setList(this, data);
    }
    becomeCandidate() {
        console.log(this.port + ' becoming candidate');
        becomeCandidate(this);
    }
    becomeLeader() {
        console.log(this.port + ' becoming leader');
        becomeLeader(this);
    }
    offline() {
        console.log("Good night I am " + this.port);
        offline(this);
    }
    keepFollower(data) {
        console.log(this.port + " I am keeping follower");
        keepFollower(this, data);
    }
    vote(data) {
        console.log("Somebody want to vote for term：" + data.termId);
        return vote(this, data);
    }
    commitLog(data) {
        console.log(this.port + ' want to commit a log : ');
        console.log(data);
        return commitLog(this, data);
    }
    requestLog(data) {
        console.log(this.port + ' want to request a log');
        return requestLog(this, data);
    }
    dump() {
        return {
            list: this.list,
            port: this.port,
            index: this.index,
            termId: this.termId,
            logSet: this.logSet,
            logCommitCnt: this.logCommitCnt,
            identifier: this.identifier,
            leaderPort: this.leaderPort,
            // heartbeatTimeId: this.heartbeatTimeId,
            // voteCnt: this.voteCnt,
            // voteList: this.voteList,
            // voteTimeId: this.voteTimeId
        }
    }
}

module.exports = Peer;