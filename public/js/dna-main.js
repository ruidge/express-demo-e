require(['vue','jquery','ios.invoke'], function (Vue,$){
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    window.external.invoke("getParams", {}, function (status, result) {
    	if (status == 200) {
        token = result.token;
        processid = result.sid;
        sdata = result.sdata;
        sBarcode =  result.sBarcode;
        dnaMain();
      } else {
        alert("get value error.");
      }
    });
  } else if (/(Android)/i.test(navigator.userAgent)) {
      var paramsStr = window.jjk.getParams();
      var params = JSON.parse(paramsStr);
       token = params.token;
       processid = params.sid;
       sdata = params.sdata;
       sBarcode =  params.sBarcode;
       dnaMain();
  }
  dnaMain();
  function dnaMain(){
    _source = GetQueryString("source");
    function GetQueryString(i) {
  	    var e = new RegExp("(^|&)" + i + "=([^&]*)(&|$)", "i"),
  	    t = window.location.search.substr(1).match(e);
  	    return null != t ? t[2] : null
  	}
    userInfoload()
    function userInfoload() {
      sBarcode = '00000000';
  	  $.ajax({
  	        url: "http://wxmalltest.test.jijiankang.cn/cjjjk/app/gene/gene_report.html",
  	        type: "POST",
  	        dataType: "jsonp",
  	        data: {
  	        	geneBarCode: sBarcode,
  	            source: _source
  	        },
  	        callback: "Jsoncallback",
  	        jsonp: "Jsoncallback",//服务端用于接收callback调用的function名的参数
  	        success: function(i) {
              result=JSON.parse(JSON.stringify(i));
              dnaMainVue(result)
  	        },
  	        fail: function(i) {
  	          $.tips("服务器或网络异常请稍后重试！")
  	        }
  	    })
        function dnaMainVue(result){
          new Vue({
            el:"#dna-main",
            data:{
              result:result
            },
            computed:{
              sex: function(){
                if(this.result.hot_risk.hot_risk_sex == 0){
                  return '女性热门-乳腺癌';
                }else{
                  return '男性热门-前列腺癌';
                }
              },
              resultDate: function(){
                return this.result.report_date.substring(0,11);
              }
           },
           methods: {
             replace: function(str){
                return str.replace(/-/g,"/");
             },
             fontColor: function(color){
               if(color == 3){
                 return 'red'
               }else{
                return 'black'
               }
             },
             bgColor: function(bgcolor){
               if(bgcolor == 1){
                 return 'bg-blue'
               }else if(bgcolor == 2){
                 return 'bg-green'
               }else if(bgcolor == 3){
                  return 'bg-red'
                }
             },
             progressWidth: function(relativeWidth){
               relativeWidth = relativeWidth*100;
               if(relativeWidth<0.1){
                 return 'width: 1%';
               }else if(relativeWidth>80){
                 return 'width: 80%';
               }else{
                 relativeWidthBar = 'width:'+relativeWidth +'%';
                 return relativeWidthBar;
               }
             },
             progressHeight: function(absoluteHeight){
               absoluteHeight = absoluteHeight*100;
               if(absoluteHeight<0.1){
                 return 'height: 1%';
               }else if(absoluteHeight>80){
                 return 'height: 80%';
               }else{
                 absoluteHeightBar = 'height:'+absoluteHeight +'%';
                 return absoluteHeightBar;
               }
             },
             riskAbsolute: function(valueAbsolute){
               valuePercent = valueAbsolute*100;
               if(valuePercent<1){
                 return '<1';
               }else if(valuePercent>80){
                 return '>80';
               }else{
                 return Math.round(valuePercent*100)/100;
               }
             },
             riskRelative: function(valueRelative){
               if(valueRelative<0.001){
                 return '<0.001';
               }else if(valueRelative>100){
                 return '>100';
               }else{
                 return Math.round(valueRelative*1000)/1000;
               }
             },
             circleLeft: function(circleLeftNum){
               if(circleLeftNum*100<0.1){
                 circleLeftNum = 1;
               }else if(circleLeftNum*100>80){
                 circleLeftNum = 80;
               }else{
                 Math.round(circleLeftNum = circleLeftNum*10000);
               }
               num= Math.round(360-circleLeftNum*3.6);
               return "transform ="+ "rotate(" + (num - 180) + "deg)";
             },
             circleRight: function(circleRightNum){
               if(circleRightNum*100<0.1){
                 circleRightNum = 1;
               }else if(circleRightNum*100>80){
                 circleRightNum = 80;
               }else{
                 circleRightNum = circleRightNum*10000;
               }
               num=  Math.round(360-circleRightNum*3.6);
               if(num<=180){
                 return "transform ="+ "rotate(" + num + "deg)";
               }else{
                 return "transform ="+ "rotate(180deg)";
               }
             },
             goDetailPage: function(riskId){
               window.location.href ='dna-detail.html?risk_Id='+ riskId
              //  window.location.href ='http://10.2.5.132:8180/api-rest/jjk6.0/dna-detail.html?risk_Id='+ riskName
             },
             goOrderPage: function(riskOrder){
               if(riskOrder=="undefined"){
                 window.location.href ='dna-list.html?risk_type='+ 'all'
               }else{
                 window.location.href ='dna-list.html?risk_type='+ riskOrder
               }
             }
           }
         })
        }
  	}
  }
});
