const ID = require('./ID');
const axios = require('axios');
const errorCode = require('./error-code');

function sendLog(that, data) {
    axios.post(`http://localhost:${that.leaderPort}/log`, data).then(res => {
        console.log(res.data);
        if (res.data.code !== errorCode['success'].code) {
            sendLog(that, data);
        }
    });
}

function requestLog(that, data) {
    if (that.identifier === ID.follower) {
        sendLog(that, data);
        return true;
    } else if (that.identifier === ID.leader) {
        that.index ++;
        that.logCommitCnt[that.index] = 0;
        that.logCommitFlag[that.index] = false;
        data.termId = that.termId;
        data.index = that.index;
        that.list.forEach(e => {
            axios.put(`http://localhost:${e.port}/log`, data).then(res => {
                console.log(res.data);
                if (res.data.code === errorCode['success']) {
                    that.logCommitCnt[that.index] ++;
                    if (!that.logCommitFlag[that.index] && that.logCommitCnt[that.index] - 1 >= Math.floor(that.list.length / 2)) {
                        that.commitLog(data);
                        that.logCommitFlag[that.index] = true;
                    }
                }
            }).catch(err => {
                console.log(e.port + ' maybe offline (commit log)');
            });
        });
        return true;
    } else {
        return false;
    }
}

module.exports = requestLog;