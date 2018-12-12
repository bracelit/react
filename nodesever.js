const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const user = require('./router/user.js')
const db = require('./dbconnect.js')
//服务器代理
const proxy = require('http-proxy-middleware')

//var server=https.createServer(options).listen(4000)

//请求头解决跨域
app.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
//
//	//跨域请求CORS中的预请求
	if(req.method == "OPTIONS") {
		res.send(200);
	} else {
		next();
	}
});
app.use('/app', proxy({
	"target": "https://recommender.predict.emarsys.cn",
		"changeOrigin": true,
		"pathRewrite":{
			"^/app":"/"
	}
})),
app.use('/city', proxy({
	"target": "http://ip.taobao.com",
		"changeOrigin": true,
		"pathRewrite":{
			"^/city":"/"
	}
})),
app.use('/api', proxy({
	"target": "http://weixin.xfj100.com",
	"changeOrigin": true
	
})),

app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use('/api/user', user)

app.listen(9999, () => {
	console.log('服务器启动')
})