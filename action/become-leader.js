const config = require('./config');
const axios = require('axios');
const ID = require('./ID');

module.exports = function (that) {
    clearTimeout(that.voteTimeId);
    clearTimeout(that.heartbeatTimeId);
    that.leaderPort = that.port;
    that.identifier = ID.leader;
    that.list.forEach(e => {
        if (e.port === that.port)
            return;
        axios.post(`http://localhost:${e.port}/setList`, {
            list: that.list,
            index: that.index,
            termId: that.termId,
            logSet: that.logSet,
            leaderPort: that.leaderPort
        }).then(res => console.log(res.data));
    });
    that.heartbeatTimeId = setInterval(function() {
        that.list.forEach(e => {
            if (e.port === that.port)
                return;
            axios.put(`http://localhost:${e.port}/heartBeat`, {termId: that.termId}).then(res => {
                console.log("send heartbeat to " + e.port);
                console.log(res.data);
            }).catch(err => {
                console.log(e.port + ' maybe offline (leader)');
                let temp = [];
                for (let i in that.list) {
                    if (that.list[i].port === e.port)
                        continue;
                    temp.push(that.list[i]);
                }
                that.list = temp;
            });
        });
    }, config.heartbeatTime);
}