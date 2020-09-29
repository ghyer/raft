const axios     = require('axios');
const errorCode = require('./error-code');

module.exports = function (that, port, introducerPort) {
    if (parseInt(introducerPort) === 0) {
        that.becomeFollower();
        return;
    }
    // 告诉介绍人要进群了
    let id = setInterval(() => {
        axios
            .post(`http://localhost:${introducerPort}/add`, {port: port})
            .then(res => {
                console.log(res.data);
                if (res.data.code === errorCode['success'].code) {
                    that.becomeFollower();
                    clearInterval(id);
                }
                else if (res.data.code === errorCode['candidating'].code)
                    return;
                else
                    console.log('进群失败1');

            })
            .catch(() => console.log('进群失败2'));
    }, 3000)
}