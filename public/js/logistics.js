require(['jquery', 'vue', 'ios.invoke','data'], function ($,Vue){
  var token;//="BBF91C544750A3918D2414F8CAF59FC79667194252C0B2E14963D284E0634D92";
  var sid;
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
    window.external.invoke("getParams", {}, function (status, result){
      if(status == 200){
        token = result.token;
        sid=result.sid;
        getLogistics();
      }else{
        alert("get value error.");
      }
    });
  }else if (/(Android)/i.test(navigator.userAgent)) {
    var paramsStr = window.jjk.getParams();
    var params = JSON.parse(paramsStr);
    token = params.token;
    sid=params.sid;
    getLogistics();
  }else{
    token = "470B4EC7E9102CD0201B087D24A9BA0AD239CD0D165BFCD564D951CF36784CB2";
    sid="410";
    getLogistics();
  };
  function getLogistics(){
    var ajs={"gensBindId":sid};
   $.ajax({
      type: 'GET',
      //正式环境
      // url: 'http://logistics.jijiankang.cn:8080/logistics_api/logistics/app/queryRoute?token='+token+'&sid='+sid,
      //测试环境1
      // url: 'http://10.2.5.105:8080/logistics_api/logistics/app/queryRoute?token='+token+'&sid='+sid,
      //测试环境1
      // url: 'http://10.2.5.105:8080/logistics_api/logistics/app/queryRoute?token='+token+'&sid='+sid,
      //测试环境2
      url: 'http://an.tunnel.qydev.com/logistics_api/logistics/app/queryRoute?token='+token+'&sid='+sid,
      data: ajs,
      async: false,
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback:"success_jsonpCallback",
      success: function(data){
        var result=JSON.parse(JSON.stringify(data));
        if(result == null){
          var tip = document.querySelector('#tip');
          tip.innerText = "请输入包装盒内附送的顺丰速运快递单的运单号，目前我们仅支持顺丰速运作为物流承运商。若您的快递单已丢失，请联系顺丰速运获取新的快递单再进行邮寄";
        }else if(result.Head == "ERR"){
          var tip = document.querySelector('#tip');
          tip.innerText = "请输入包装盒内附送的顺丰速运快递单的运单号，目前我们仅支持顺丰速运作为物流承运商。若您的快递单已丢失，请联系顺丰速运获取新的快递单再进行邮寄";
        }else{
           showLogistics(result);
        }
      },
      error: function(xhr, type){
        var tip = document.querySelector('#tip');
        tip.innerText = "请输入包装盒内附送的顺丰速运快递单的运单号，目前我们仅支持顺丰速运作为物流承运商。若您的快递单已丢失，请联系顺丰速运获取新的快递单再进行邮寄";
      }
    });
  };
  function showLogistics(result){
    new Vue({
      el: '#content',
      data:{
        result: result,
      },
      computed:{
        logistics: function(){
          return this.result.Body.RouteResponse.mailno;
        },
        routes: function(){
          return this.result.Body.RouteResponse.Route;
        }
      }
    });
  };
});
