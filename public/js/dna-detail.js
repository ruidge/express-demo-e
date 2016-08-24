require(['vue', 'jquery','ramda','ios.invoke'], function (Vue,$,R){
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    window.external.invoke("getParams", {}, function (status, result) {
    	if (status == 200) {
        token = result.token;
        processid = result.sid;
        sdata = result.sdata;
        sBarcode =  result.sBarcode;
        dnaDetail();
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
       dnaDetail();
  };
  // 解析url
  transferUrl = R.compose(arr=>R.zipObj(arr[0],arr[1]),R.transpose,R.map(e=>R.split('=')(e)),R.split('&'),R.last,R.split('?'));
  //risk_Id对象
  risk_id =  transferUrl(window.location.href);
  //risk_Id字符串
  riskId =  risk_id.risk_Id;
  console.log(riskId);
  dnaDetail();
  function dnaDetail(){
    _source = GetQueryString("source");
    function GetQueryString(i) {
        var e = new RegExp("(^|&)" + i + "=([^&]*)(&|$)", "i"),
        t = window.location.search.substr(1).match(e);
        return null != t ? t[2] : null
    }
    userInfoload();
    function userInfoload(){
      sBarcode = '00000000';
      $.ajax({
        url: "http://wxmalltest.test.jijiankang.cn/cjjjk/app/gene/gene_risk_report.html",
        type: "POST",
        dataType: "jsonp",
        data: {
          geneBarCode: sBarcode,
          source: _source,
          riskId: riskId
        },
        callback: "Jsoncallback",
        jsonp: "Jsoncallback",//服务端用于接收callback调用的function名的参数
        success: function(i) {
          result=i;
          dnaDetailVue(result);
        },
        fail: function(i) {
          alert("服务器或网络异常请稍后重试！")
        }
      })
    }
  }
  function dnaDetailVue(result){
    new Vue({
      el:"#dna-detail",
      data:{
        result: result
      },
     methods:{
       bgColor: function(){
         if (this.risk_order == 1) {
            return {backgroundColor: 'red'}
          }else if(this.risk_order == 2){
            return {backgroundColor: 'green'}
          }else{
            return {backgroundColor: 'blue'}
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
       replaceList: function(str){
         return str.replace(/。/g,"。<br>");
       },
       replaceResult: function(str){
         return str.replace(/\*/g,"<br>*");
       }
     }
   })
  }

});
