require(['vue', 'ramda','jquery','ios.invoke'], function (Vue,R,$){

  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    window.external.invoke("getParams", {}, function (status, result) {
    	if (status == 200) {
        token = result.token;
        processid = result.sid;
        sdata = result.sdata;
        sBarcode =  result.sBarcode;
        dnaList();
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
       sBarcode =  result.sBarcode;
       dnaList();
  }
  dnaList();
  transferUrl = R.compose(arr=>R.zipObj(arr[0],arr[1]),R.transpose,R.map(e=>R.split('=')(e)),R.split('&'),R.last,R.split('?'));
  //risk_Id对象
  risk_order =  transferUrl(window.location.href);
  //risk_Id字符串
  riskOrder = risk_order.risk_type;
  console.log(riskOrder);
  function dnaList(){
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
            dnaListVue(result);
          },
          fail: function(i) {
            $.tips("服务器或网络异常请稍后重试！")
          }
      })
    function dnaListVue(){
      new Vue({
        el:"#dna-list",
        data:{
          sortMethod:0,
          result:result,
          riskOrder:'all'
        },
        computed:{
          riskOrder: function(R){
            transferUrl = R.compose(arr=>R.zipObj(arr[0],arr[1]),R.transpose,R.map(e=>R.split('=')(e)),R.split('&'),R.last,R.split('?'));
            return transferUrl(window.location.href);
          }
        },
       methods:{
         riskAbsolute: function(valueAbsolute){
           valuePercent = valueAbsolute*100;
           console.log(riskOrder);
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
           if(relativeWidth<0.1){
             return 'width: 1%';
           }else if(relativeWidth>100){
             return 'width: 100%';
           }else{
             relativeWidthBar = 'width:'+relativeWidth*10 +'%';
             return relativeWidthBar;
           }
         },
         goDetailPage: function(riskId){
           window.location.href ='dna-detail.html?risk_Id='+ riskId
         },
         changeMethod:function(method){
         	this.sortMethod = method
         },
         sort:function(arr){
         		if(this.sortMethod==0){
         			return arr;
         		}else if(this.sortMethod==1){
         			return  R.sort(function(a,b){return -(a.risk_absolute-b.risk_absolute)})(arr);
         		}else if(this.sortMethod==-1){
         			return  R.sort(function(a,b){return -(a.risk_relative-b.risk_relative)})(arr)
         		}
         }
       }
     })
    }
  }
}
});
