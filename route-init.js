const errorCode = require('./action/error-code');

module.exports = function (app, peer, port) {
    app.get('/', (req, res) => {
        res.send(peer.dump());
    });

    app.put('/log', (req, res) => {
        let data = req.body;
        peer.commitLog(data);
        res.send(errorCode['success']);
    });               // 告知节点需要提交log了
    app.put('/heartBeat', (req, res) => {
        peer.keepFollower(req.body);
        res.send(errorCode['success']);
    });         // 心跳包接收

    app.post('/add', (req, res) => {
        // 作为介绍人响应被介绍人的进群结果
        if (peer.IamIntroducer(req.body.port))
            res.send(errorCode['success']);
        else
            res.send(errorCode['candidating']);
    });              // 添加新节点
    app.post('/log', (req, res) => {
        if (peer.requestLog(req.body)) {
            res.send(errorCode['success']);
        } else {
            res.send(errorCode['commitWait']);
        }
    });              // 客户端请求添加log
    app.post('/setList', (req, res) => {
        peer.setList(req.body);
        res.send(errorCode['success']);
    });          // 新节点加入后或者选举出新领导以后通知所有节点更新自身数据
    app.post('/requestVote', (req, res) => {
        if (peer.vote(req.body)) {
            res.send(errorCode['success']);
        } else {
            res.send(errorCode['voteAlready']);
        }
    });      // 发起一轮投票

    app.delete('/offline', (req, res) => {
        peer.offline();
        res.send(errorCode['success']);
    });        // 使节点下线
};