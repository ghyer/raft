const ID        = require('./ID');
const axios     = require('axios');
const config    = require('./config');

module.exports = function (that) {
    if (that.identifier !== ID.follower)
        return;
    that.termId ++;
    that.voteCnt = 0;
    that.identifier = ID.candidate;
    that.list.forEach(e => {
        axios.post(`http://localhost:${e.port}/requestVote`, {
            termId: that.termId,
            lastLog: that.list[that.list.length - 1]
        }).then(res => {
            console.log(res.data);
            if (that.identifier !== ID.candidate)
                return;
            if (res.data.code === 20000) {
                that.voteCnt ++;
                if (that.identifier !== ID.leader && that.voteCnt - 1 >= Math.floor(that.list.length / 2)) {
                    that.becomeLeader();
                }
            }
        }).catch((err) => {
            console.log(e.port + ' maybe offline');
            let temp = [];
            for (let i in that.list) {
                if (that.list[i].port === e.port)
                    continue;
                temp.push(that.list[i]);
            }
            that.list = temp;
        });
    });
    that.voteTimeId = setTimeout(function() {
        that.becomeFollower();
    }, config.voteTimeout)
}