const {createProxyMiddleware} = require('http-proxy-middleware');
const express = require('express');
const app = express();

// app.get("/", function (req, res) {
//     res.send('Hello World!');
// });
// console.log("ok")

local = false
wsEndpoint = local ? 'ws://192.168.122.29:8080/hs/websocket' : 'ws://10.23.92.23:30007/hs/websocket'
httpEndpoint = local ? 'http://192.168.122.29:8080/hs/services' : 'http://10.23.92.23:30007/hs/services'
statEndpoint = local ? 'http://192.168.122.29:8080/hs/statistic' : 'http://10.23.92.23:30007/hs/statistic'


const gitOptions = {
  target: 'http://10.23.92.95:8180',
  pathRewrite: {
    '^/back/git': '/git',
  },
};


let pmw = createProxyMiddleware(wsEndpoint); // ws://localhost:8080/ws  // , ,,

app.use('/hs/websocket', pmw);


app.use("/fm/modules/", express.static('./dist/modules/'));
app.use("/fm/", express.static('./scripts/fm'));

app.use('/query', createProxyMiddleware('http://10.23.92.86:8080/'));
app.use('/bh', createProxyMiddleware('http://127.0.0.1:9944/'));
app.use('/hs/services', createProxyMiddleware(httpEndpoint,{}));
app.use('/hs/statistic', createProxyMiddleware(statEndpoint,{}));



app.use("/", express.static('./dist/packages/fronts/ui/'));
app.use("/*", express.static('./dist/packages/fronts/ui/'));
app.use("/*/*", express.static('./dist/packages/fronts/ui/'));

let port = 80;




// app.on("error", (err) =>{
//   console.log("Caught flash policy server socket error: ");
//   console.log(err.stack)
// })

// app.use("/sendmail/*", createProxyMiddleware('http://127.0.0.1:8880//sendmail'));
  let server = app.listen(port, () => console.log(`server running on port ${port}!`));


server.on('upgrade', pmw.upgrade);
