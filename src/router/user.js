const express=require('express');
const Router=express.Router();
const userModel=require('../modules/userModel.js');
const mail=require('../mail.js')
const util=require('../utils/utli.js')
/**
 * @api {post} /user/checkname/ 验证用户名
 * @apiName 验证
 * @apiGroup User
 *
 * @apiParam {String} us Users unique ID.
 * @apiSuccess {String}  err
 * @apiSuccess {String}   ok
 */
Router.post('/checkname',(req,res)=>{
	let {us}=req.body;
	//console.log(req.body);
	userModel.find( {us})
	.then((data)=>{
	  // console.log(data)
	   if (data.length>=1) { return res.send("用户名已存在")}
	   	res.send('ok')
	})
	
})
/**
 * @api {post} /user/login/ 登录
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} pass 用户密码
 *
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg 成功信息
 */
 let obj={}
Router.post('/login',(req,res)=>{
	let {us,pass}=req.body;
	userModel.find( {us,pass})
	.then((data)=>{
	   if (data.length>=1) { return res.send('登录成功')}
	   	res.send("登录失败")
	})
	
})
/**
 * @api {post} /user/reg/ 注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} pass 用户密码
 *
 * @apiSuccess {String} err 错误
 * @apiSuccess {String} msg  成功
 */

Router.post('/reg',(req,res)=>{
	let {us,pass,code}=req.body;
	if (obj[us]!==code) { return res.send(util.sendData(-1,'验证码错误',null) )}
	userModel.insertMany({us,pass})
	.then((data)=>{
		res.send(util.sendData(0,'注册成功自动登录',null))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'注册失败',null))
	})
	
})
// 获取邮箱验证码

/**
 * @api {post} /user/getcode/ 获取邮箱验证码
 * @apiName getcode
 * @apiGroup User
 *
 * @apiParam {String} email 用户邮箱
 *
 * @apiSuccess {String} err Firstname of the User.
 * @apiSuccess {String} msg  Lastname of the User.
 */
Router.post('/getcode',(req,res)=>{
	let {email}=req.body;
	console.log(email)
	if (!email||email=="") {return res.send(util.sendData(-1,'参数错误',null))}
    let num1=(parseInt(Math.random(0,1)*10000)).toString()
    //生成验证码
	mail.sendmail(email,num1)
	.then((resolve)=>{
		obj[email]=num1
		//保存验证码信息
//		 console.log(obj[email]);
		res.send(util.sendData(0,'验证码已发送',null))
	})
	.catch((err)=>{
		console.log(err)
		res.send(util.sendData(-1,'验证码发送失败',null))
	})
	
})
module.exports=Router;