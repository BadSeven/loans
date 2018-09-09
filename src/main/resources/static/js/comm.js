  function yw_click(){
    if(click_weizhi!="login"&&click_weizhi!="loginsuccess"){
      usercodetype="";
    }
    var qingqiuurl="https://yw.jielema.com/p2pactivemq/url/count?proname="+pagename+"&productid="+click_id+"&jumpmodule="+jumppagenumber+"&module="+thispagenumber+"&apptype="+apptype+"&token="+h5_weiyibiaoshi+"&usercode="+usercode+"&usetime="+usercodetype+"&templet="+phone_type+"&remark="+click_weizhi+"&browsedata="+browsedata+"&url="+thisurl+"&counttype=wechat";
    $.ajax({type: "GET",url: qingqiuurl,dataType: 'jsonp',jsonp: 'jsoncallback',async:false,data:""});
  }
  
  function load(){
    var qingqiuurl="https://yw.jielema.com/p2pactivemq/url/count?proname="+pagename+"&module="+thispagenumber+"&apptype="+apptype+"&token="+h5_weiyibiaoshi+"&usercode="+usercode+"&templet="+phone_type+"&remark="+click_weizhi+"&browsedata="+browsedata+"&url="+thisurl+"&counttype=wechat";
    $.ajax({type: "GET",url: qingqiuurl,dataType: 'jsonp',jsonp: 'jsoncallback',async:false,data:""});
  }
  
  function load_detail(){
    var qingqiuurl="https://yw.jielema.com/p2pactivemq/url/count?proname="+pagename+"&productid="+click_id+"&module="+thispagenumber+"&apptype="+apptype+"&token="+h5_weiyibiaoshi+"&usercode="+usercode+"&templet="+phone_type+"&remark="+click_weizhi+"&browsedata="+browsedata+"&url="+thisurl+"&counttype=wechat";
    $.ajax({type: "GET",url: qingqiuurl,dataType: 'jsonp',jsonp: 'jsoncallback',async:false,data:""});
  }
  
  function tongji_pro(pro_id,tongji_type){
    //ostype:1-andriod  2-ios 3-微信; type:1-产品 2-广告
    var dataMsg={"title":pro_id,"ostype":"3","type":tongji_type,"module":module};
    $.ajax(
    {
      type:'post',
      url : ajaxurl,
      async: false,
      dataType : 'json',
      data:{
        serCode:'10032',
        token:h5_token,
        erminalCode:JSON.stringify(erminalCode),
        dataMsg:JSON.stringify(dataMsg)
      } ,
      success  : function(data) {
        //pro_tongji_id=data.result.id;//点击一次产品则一次生成一次统计id
      },
      error : function() {       
      }  
    });
  }
  
  function click_pro(){
    var dataMsg={"loanForm":{"productId":pro_id,"module":module},"userBorrower":{}};
    $.ajax(
    {
      type:'post',  
      url : ajaxurl,  
      async: false,
      dataType : 'json',  
      data:{
        serCode:'10085',
        token:h5_token,
        //platformversion:platformversion,
        erminalCode:JSON.stringify(erminalCode),
        dataMsg:JSON.stringify(dataMsg)
      },
      success  : function(data) {
        //console.log(JSON.stringify(data));
        responseCode=data.responseCode;
        if(data.responseCode=="0004"){
          pro_url=data.result.url;//部分产品需要请求新的url
        }
        subSomething();
        //storage.setItem("key_pro_dingdan_id",data.result.id);//点击一次产品则一次生成一次订单ID
      }, 
      error : function() { 
      }
    });
  }
  
  /*关闭产品弹窗*/
  $(".tanchuang_product_xuanfu").on("click",'.tanchuang_btn_close',function(){
    $(".tanchuang_product_xuanfu").animate({ top:"300px",opacity:0},300,function(){
      $(".tanchuang_product_xuanfu").css("display","none");
      $(".zhezhao").css("display","none");
    });
  });
  
  /*点击产品弹窗中的产品*/
  $(".tanchuang_product_xuanfu").on("click",'.tanchuang_product ul li',function(){
    location.href="productdetail.html?pro_id="+$(this).attr("data-id")+"&umengchannel="+h5_umengchannel;
  })
  
  /*点击跳转到全部产品*/
  $(".tanchuang_product_xuanfu").on("click",'.btn_go_allpro',function(){
    location.href="loan_search.html?umengchannel="+h5_umengchannel;
  })
  
  //查询未读消息
  function load_all_noread(){
    var dataMsg={"usertype":1};
    $.ajax(
    {
      type:'post',
      url : ajaxurl, 
      async: false,
      dataType : 'json',
      data:{
        serCode:'10012',
        token:h5_token,
        erminalCode:JSON.stringify(erminalCode),
        dataMsg:JSON.stringify(dataMsg)
      },
      success : function(data) {
        console.log(JSON.stringify(data));
        if("0000"==data.responseCode){
          //消息未读数
          if(data.result.count!=0){
            $("#my_message .tixingyuan").css("display","block");
            $("#tab_my .tixingyuan").css("display","block");
          }
          else{
             $("#my_message .tixingyuan").css("display","none");
             $("#tab_my .tixingyuan").css("display","none");
          }
        }
        else if("0003"==data.responseCode){
          removeItem_h5_storage();//清除缓存
        }
        else{
        }
      },  
      error : function() {
      }
    });
  }

//清除缓存token
function removeItem_h5_token(){
  storage.removeItem("h5_token");//清楚token
  storage.removeItem("h5_mobile");//清楚mobile
  h5_token="";
  h5_mobile="";
  $(".tanchuang_login").css("display","block");
  $(".zhezhao").css("display","block");
  $(".tanchuang_login").css("opacity","0");
  $(".tanchuang_login").animate({ top:($(window).height()-$(".tanchuang_login").height())/2+$(document).scrollTop(),opacity:1},300);
}

//清除缓存
function removeItem_h5_storage(){
  storage.removeItem("h5_token");//清楚token
  storage.removeItem("h5_mobile");//清楚mobile
  h5_token="";
  h5_mobile="";
}

//右上角x按钮关闭登录弹窗
$(".tanchuang_login").on("click",'.tanchuang_login_close',function(){
  tanchuang_login_close();
});

//关闭登录弹窗
function tanchuang_login_close(){
  //弹窗距离顶部高度-设置
  $(".tanchuang_login").animate({ "top":($(window).height()-$(".tanchuang_login").height())+$(document).scrollTop(),"opacity":0},300,function(){
    $(".tanchuang_login").css("display","none");
    $(".zhezhao").css("display","none");
    return false;
  });
}

function loadinggif(){
  $(".noloading").css("display","block");
  $(".zhezhao").css("display","block");
  $(".winbox").css({"height":winHeights,"overflow":"hidden"});//弹窗后禁止外部层超过屏幕高度滚动
}

function subSomething(){
  $(".noloading").css("display","none"); //Load隐藏掉
	$(".zhezhao").css("display","none");
	$(".winbox").css({"height":"auto","overflow":"visible"});//取消外部层级超过屏幕被隐藏高度
}

function subSomething2(){
  //用于在弹窗界面使用，因为弹窗页面是有zhezhao层的，不能在判断弹窗内容加载后隐藏zhezhao层
  $(".noloading").css("display","none"); //Load隐藏掉
  $(".winbox").css({"height":"auto","overflow":"visible"});//取消外部层级超过屏幕被隐藏高度
}

//提示弹窗打开
  function tanchuang_tishi_open(tishi_title){
    //$(".winbox").css({"height":winHeights,"overflow":"hidden"});//弹窗后禁止外部层超过屏幕高度滚动
    $(".zhezhao").css("display","block");
    $(".zhezhao").css("z-index","10003");
    $(".tanchuang_tishi").css("display","block");
    $(".tanchuang_title").html(tishi_title);
  }

  //提示弹窗关闭
  $(".tanchuang_tishi").on("click",'a.tanchuang_btn_guanbi',function(){
    //$(".winbox").css({"height":"auto","overflow":"visible"});//取消外部层级超过屏幕被隐藏高度
    $(".zhezhao").css("display","none");
    $(".zhezhao").css("z-index","10000");
    $(".tanchuang_title").html("");
    $(".tanchuang_tishi").css("display","none");
  });

  function tanchuang_tishi2_open(tishi_title){
    var this_tishi_html=
      '<div class="tanchuang_box">'+
        '<span class="tanchuang_title">'+tishi_title+'</span>'+
      '</div>';
    $(".tanchuang_tishi2").html(this_tishi_html);
    $(".tanchuang_tishi2 .tanchuang_box .tanchuang_title").css({"display":"block","width":tishi_title.length*26,"font-size":"26px"});
    $(".tanchuang_tishi2").css({"display":"block","opacity":"0.8"});
    
    setTimeout(function(){ 
      $(".tanchuang_tishi2").animate({ opacity:"0"},500,function(){
        $(".tanchuang_tishi2").css("display","none");
      });
    },1000)
  }

//文字提示
function tishi1(txt){
  $(".tanchuang_tishi_xf").css({"display":"block","opacity":"1"});
  $(".tanchuang_tishi_xf .tanchuang_tishi_xf_title").html(txt);
  setTimeout(function() { 
    $(".tanchuang_tishi_xf").animate({ opacity:"0"},500,function(){
      $(".tanchuang_tishi_xf .tanchuang_tishi_xf_title").html("");
      $(".tanchuang_tishi_xf").css({"display":"none"});
    });
  },1500) 
}

//文字提示
function popUp_tip(txt){
  $(".popUp_tip").css({"display":"block","opacity":"1"});
  $(".popUp_tip .popUp_tip_title").html(txt);
  setTimeout(function(){ 
    $(".popUp_tip").animate({ opacity:"0"},500,function(){
      $(".popUp_tip .popUp_tip_title").html("");
      $(".popUp_tip").css({"display":"none"});
    });
  },1500)
}

/*生成确认和取消按钮弹窗*/
function popUp_confirm(){
  confirem_html=
    '<div class="popUp_confirm_box">'+
      '<div class="popUp_confirm_title"></div>'+
      '<div class="popUp_confirm_cont"></div>'+
      '<div class="popUp_confirm_btn">'+
      '  <div class="popUp_confirm_line1"></div>'+
      '  <li class="fl w50p"><div class="popUp_confirm_btn_false">取消</div></li>'+
      '  <li class="fl w50p"><div class="popUp_confirm_btn_sure">确定</div></li>'+
      '</div>'+
    '</div>';
  $(".popUp_confirm").html(confirem_html);
}

/*生成确认按钮弹窗*/
function popUp_confirm2(){
  confirem_html=
    '<div class="popUp_confirm_box">'+
      '<div class="popUp_confirm_title"></div>'+
      '<div class="popUp_confirm_cont"></div>'+
      '<div class="popUp_confirm_btn">'+
      '  <li class="fl w100p"><div class="popUp_confirm_btn_sure">确定</div></li>'+
      '</div>'+
    '</div>';
  $(".popUp_confirm").html(confirem_html);
}

/*生成提示弹窗*/
function popUp_confirm3(){
  confirem_html=
    '<div class="popUp_confirm_box">'+
      '<div class="popUp_confirm_title"></div>'+
      '<div class="popUp_confirm_cont"></div>'+
    '</div>';
  $(".popUp_confirm").html(confirem_html);
}

//关闭弹窗确认框架
$(".popUp_confirm").on("click",'.popUp_confirm_btn_sure',function(){
  $(".popUp_confirm").animate({ top:"60%",opacity:0},300,function(){
    $(".popUp_confirm").css("display","none");
    $(".zhezhao").css("display","none");
  });
})

$(".popUp_confirm").on("click",'.popUp_confirm_btn_false',function(){
  $(".popUp_confirm").animate({ top:"60%",opacity:0},300,function(){
    $(".popUp_confirm").css("display","none");
    $(".zhezhao").css("display","none");
  });
})

//自动关闭弹窗提示框架
function popUp_confirm3_close(){
  $(".popUp_confirm").animate({ top:"60%",opacity:0},300,function(){
    $(".popUp_confirm").css("display","none");
    $(".zhezhao").css("display","none");
  });
}