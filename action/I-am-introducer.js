const axios     = require('axios');
const ID    = require('./ID');

module.exports = function (that, port) {
    if (that.identifier === ID.leader) {
        // 加入集群
        that.list.push({port: port});
        that.list.forEach((e) => {
            if (e.port === that.port)
                return;
            let data = {
                logSet: that.logSet,
                list: that.list,
                index: that.index,
                termId: that.termId,
                leaderPort: that.leaderPort
            };
            axios.post(`http://localhost:${e.port}/setList`, data).then(res => {
                console.log(res.data);
            });
        });
        return true;
    } else if (that.identifier === ID.candidate) {
        return false;
    } else {
        axios.post(`http://localhost:${that.leaderPort}/add`, {port: port}).then(res => {
            console.log(res.data);
        });
        return true;
    }
}