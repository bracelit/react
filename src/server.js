const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const db=require('./dbconnect.js')
const path=require('path');
const cors=require('cors');
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
app.use('/api', proxy({
	"target": "https://recommender.predict.emarsys.cn",
		"changeOrigin": true,
		"pathRewrite":{
			"^/api":"/"
	}
}))
//app.use(cors());
//post参数解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//静态文件开启
//app.use(express.static(path.join(__dirname,'./public')))
//router
const user=require('./router/user.js')
app.use('/api/user',user);
// app.get('/login',(req,res)=>{
// 	res.send('1111')
// })

app.listen(3000,()=>{
	console.log('server start in port'+3000)
})