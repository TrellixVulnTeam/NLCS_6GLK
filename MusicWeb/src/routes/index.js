const playlistRouter = require('./playlist.routes.js');
const songRouter = require("./song.routes.js");
const userRouter = require("./user.routes.js");
const reportRouter = require("./report.routes.js");
const authRouter = require("./auth.routes.js");
function route(app){
    app.use('/api/playlist', playlistRouter);
    app.use('/api/user', userRouter);
    app.use('/api/song', songRouter);
    app.use('/api/report', reportRouter);       
    app.use('/api/auth', authRouter);          
}

module.exports = route;
