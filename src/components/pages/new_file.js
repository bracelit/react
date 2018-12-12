const request=require('request');
let url='https://api.sephora.cn/v1/product/consulation/consulationList?productId=982743&pageNo=1&pageSize=3';
request.get(url,function(err,res){
	console.log(err)
	console.log(res)
})
