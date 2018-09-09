var ajaxurl="/iotglb-openapi/api/lend";
var ajaxurl_bill="/iotglb-openapi/api/bill";
var ajaxurl_weixin="/wx-openapi/api/wx";
var ajaxurl_loannew="/iotglb-openapi/api/loannew";

if(location.href.indexOf("172.16")>=0){
  ajaxurl="/wx-openapi/ajaxProxy";
  ajaxurl_bill="/wx-openapi/ajaxProxy";
  ajaxurl_weixin="/wx-openapi/ajaxProxy";
  ajaxurl_loannew="/wx-openapi/ajaxProxy";
}

var thisurl=location.href;

if(thisurl.indexOf("*!*")>=0){
  //转义自己定义的特殊格式*!*
  thisurl=thisurl.replace(/\*\!\*/g,"&");
  location.href=thisurl;
}

var ua = navigator.userAgent;
var winHeights=$(window).height();

var dingwei_city;
var storage;
var pro_id="";
var pro_url="";
var banner_id="";
var module="";
var this_tag="";
var orderid="";
var tongji_type="";
var responseCode="";

var phonetype;
if(ua.match(/android/i)){
  phonetype="1";
}
else if(ua.match(/ios|iphone/i)){
  phonetype="2";
}
else if(ua.match(/ipad/i)){
  phonetype="4";
}
else{
  phonetype="5";
}

var isLocalStorageSupportNumber=0;
function isLocalStorageSupported(storage){
  var testKey = 'test';
  try{
    storage = storage;
    storage.setItem(testKey, 'testValue');
    storage.removeItem(testKey);
    isLocalStorageSupportNumber=1;
    return true;
  }
  catch (error) {
    isLocalStorageSupportNumber=0;
    return false;
  }
}
if(isLocalStorageSupported(window.localStorage)){
  storage = window.localStorage;
}
else if(isLocalStorageSupported(window.sessionStorage)){
  storage = window.sessionStorage;
}

var theRequest;
GetRequest();
function GetRequest() {
  var url_info = location.search; //获取url中"?"符后的字串
  if(url_info.indexOf("#rd")>=0){
    //已读文章，微信会自带一个已读标签#rd
    url_info=url_info.split("#rd")[0];
  }
  theRequest = new Object();
  if(url_info.indexOf("?") != -1){
    var str = url_info.substr(1);
    if(str.indexOf("?")!=-1){
      str=str.replace(/\?/g,"&");
    }
    strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
    }
  }
}

var h5_mobile="";
if(storage.getItem("h5_mobile")!=""&&storage.getItem("h5_mobile")!=null&&storage.getItem("h5_mobile")!="undefined"){
  h5_mobile=storage.getItem("h5_mobile");
}
else{
  storage.removeItem("h5_token");
}

var h5_token="";
if(storage.getItem("h5_token")!=""&&storage.getItem("h5_token")!=null&&storage.getItem("h5_token")!="undefined"){
  h5_token=storage.getItem("h5_token");
}

var h5_umengchannel="";
//先获取缓存h5_umengchannel
if(storage.getItem("h5_umengchannel")!=""&&storage.getItem("h5_umengchannel")!=null&&storage.getItem("h5_umengchannel")!="undefined"){
  h5_umengchannel=storage.getItem("h5_umengchannel");
}
//在判断链接是否有umengchannel
if(theRequest["umengchannel"]!=""&&theRequest["umengchannel"]!=null&&theRequest["umengchannel"]!="undefined"){
  h5_umengchannel=theRequest["umengchannel"];
  if(h5_umengchannel.indexOf("#rd")>=0){
    h5_umengchannel=h5_umengchannel.split("#rd")[0];
  }
  storage.setItem("h5_umengchannel",h5_umengchannel);
}
//若缓存和链接中都没有h5_umengchannel，赋值weixin_noumengchannel
if(h5_umengchannel==""||h5_umengchannel==null||h5_umengchannel=="undefined") {
  h5_umengchannel="weixin_noumengchannel";
  storage.setItem("h5_umengchannel",h5_umengchannel);
}

thisurl=encodeURIComponent(thisurl);//页面不需要跳转了就将需要传输的当前URL转化一次编码
var click_id="";
var click_weizhi="";
var usercodetype="";
var usercode=h5_mobile;
var pagename=h5_umengchannel;

var apptype="weixin";
if(theRequest["wt"]!=""&&theRequest["wt"]!=null&&theRequest["wt"]!="undefined"){
  apptype=theRequest["wt"];
}
var flag="";//下载包目录
var phone_type;
if (ua.match(/ipad|ios|iphone/i)) {
  phone_type="ios";
}
else if (ua.match(/android/i)){
  phone_type="android";
}
else{
  phone_type="other";
}
var thispagenumber="";//当前页面
var jumppagenumber="";//跳转页面

var browsedata=encodeURIComponent(navigator.userAgent);//当前浏览器信息

var h5_publickey="";
var h5_privateKey="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgJcwImULjNgbKr+EkYZwZBAWr6d/V39VxfPjFbktUFVBFi47Jk5hnlUw4+7tfCmhSafANgRUw3N1lHw7ZMWir8RJGcFueBcLC33kYiU3gRD4TiQt4RnB6s2IsfeR+7CBgQ2RKNEhNReFQTopprJN4DiYuGEH9pVV7rGpXPoFRgwIDAQAB";

var erminalCode={"appname":"借了吗_微信","appversion":"2.3","ostype":phonetype,"type":phonetype,"umengchannel":h5_umengchannel};
var erminalCode2={"appname":"借了吗_微信","appversion":"2.3","ostype":phonetype,"type":phonetype,"umengchannel":h5_umengchannel};
var erminalCode_mybill={"appname":"借了吗_微信","appversion":"2.3","ostype":phonetype,"type":phonetype,"apptype":"weixin","umengchannel":h5_umengchannel};

var h5_weixin_openid="";
var h5_weiyibiaoshi="";//用于把openid存储到统计表里的token字段
var h5_huoqu_openid_cishu="";//用来记录用户获取openid的次数，超过3次后不在获取
var h5_updata_openid_cishu="";//用来记录上传openid的次数，超过1次后不在上传

var key_user_dingwei_city="";
var key_user_dingwei_point_lat="";
var key_user_dingwei_point_lon="";

var load_data="";
/*初始化*/
var pageNumber = 1; /*页面*/
var pageSize = 10; /*size*/
var totalPages=0;//总数
var load_num=1;//允许加载次数，防止重复加载

var pageNumber2 = 1; /*页面*/
var pageSize2 = 10; /*size*/
var totalPages2=0;//总数
var load_num2=1;//允许加载次数，防止重复加载

$(document).ready(function (){
  //storage.removeItem("h5_weixin_openid");
  //storage.removeItem("h5_huoqu_openid_cishu");
  //storage.removeItem("h5_updata_openid_cishu");
  //return false;
  
  //点击-tab栏
  $(".tab").on("click","li",function(){
    if($(this).attr("id")=="tab_home"&&$(this).attr("class").indexOf("tab_li_curr")=="-1"){
      location.href="home_jlm.html?umengchannel="+h5_umengchannel;
    }
    if($(this).attr("id")=="tab_jlm"&&$(this).attr("class").indexOf("tab_li_curr")=="-1"){
      location.href="loan_search.html?umengchannel="+h5_umengchannel;
    }
    if($(this).attr("id")=="tab_my"&&$(this).attr("class").indexOf("tab_li_curr")=="-1"){
      location.href="my.html?umengchannel="+h5_umengchannel;
    }
  })
  
  if(location.href.indexOf("openid")>=0){
    h5_weixin_openid=theRequest["openid"];

    storage.setItem("h5_weixin_openid",h5_weixin_openid);
    storage.setItem("h5_weixin_openid_umengchannel",h5_umengchannel);
    storage.removeItem("h5_huoqu_openid_cishu");//限制次数内拿到openid就清除使用过的次数
    storage.removeItem("h5_updata_openid_cishu");//拿到openid就清除openid上传过的次数,重新上传
    //储存openid时同事储存openid_umengchannel为当前页面的umengchannel，用来判断进入页面的微信公众号umengchannel是否等同储存openid时的umengchannel
  }
  else{
    //h5_umengchannel中包含weixin字符串时表示是微信入口
    if (ua.match(/MicroMessenger/i)){     
      if(h5_umengchannel!=""&&h5_umengchannel!=null&&h5_umengchannel!="undefined"&&storage.getItem("h5_weixin_openid_umengchannel")!=storage.getItem("h5_umengchannel")){
        //h5_umengchannel有值时（否则h5_umengchannel和openid_umengchannel都为null时，就跳过循环了），
        //且h5_weixin_openid_umengchannel与h5_umengchannel不相等时，表示openid是在其他公众号存储的，则需要清除掉缓存的openid，需要重新获取
        storage.removeItem("h5_weixin_openid");//清空在别的公众号缓存的h5_weixin_openid
        h5_weixin_openid="";//赋值空值
        if(h5_weixin_openid==""||h5_weixin_openid==null||h5_weixin_openid=="undefined"){
          h5_huoqu_openid_cishu=storage.getItem("h5_huoqu_openid_cishu");
          if(h5_huoqu_openid_cishu==""||h5_huoqu_openid_cishu==null||h5_huoqu_openid_cishu=="undefined"){
            h5_huoqu_openid_cishu=0;//若h5_huoqu_openid_cishu不存在时赋值初始值0
            storage.setItem("h5_huoqu_openid_cishu",h5_huoqu_openid_cishu);
          }
          if(h5_huoqu_openid_cishu<5){
            //每天允许获取openid的次数，防止用户拿不到时用户一直循环在空白页
            h5_huoqu_openid_cishu=Number(h5_huoqu_openid_cishu)+1;//跳转获取openid函数前，次数+1
            storage.setItem("h5_huoqu_openid_cishu",h5_huoqu_openid_cishu);
            var getNowDateYYYYMMDD = Date.parse(new Date(getNowFormatDateYYYYMMDD()));//当前日期时间戳
            storage.setItem("h5_huoqu_openid_date",getNowDateYYYYMMDD);//存储请求openid的日期时间戳
            if(h5_umengchannel.indexOf("weixin")>=0){
              weixin_openid();//获取openid
            }
          }
          else{
            //若超过次数时，判断是否为今天超过的，否则清除次数，让用户可以重新获取
            var getNowDateYYYYMMDD = Date.parse(new Date(getNowFormatDateYYYYMMDD()));//当前日期时间戳
            var h5_huoqu_openid_date=storage.getItem("h5_huoqu_openid_date");//调取上次请求openid的日期时间戳
            if(getNowDateYYYYMMDD!=h5_huoqu_openid_date){
              h5_huoqu_openid_cishu=1;//重新获取ipenid次数
              storage.setItem("h5_huoqu_openid_cishu",h5_huoqu_openid_cishu);
              weixin_openid();//获取openid
            }
          }
        }
      }
    }
  }

  //获取当前时间，格式YYYY-MM-DD
  function getNowFormatDateYYYYMMDD(){
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }

  function weixin_openid(){
    var openid_thisurl=location.href;
    openid_thisurl=openid_thisurl.replace(/\&/g,"*!*");
    $.ajax(
    {
      type:'post',  
      url : '/wx-openapi/api/wx',
      async: false,//使用同步的方式,AJAX执行完才会进行其他函数,true为异步方式
      dataType : 'json',  
      data:{
        serCode:'10058',
        dataMsg:'{"umengchannel":"'+h5_umengchannel+'","redirectUrl":"'+openid_thisurl+'"}'
      },
      success : function(data) {
        if(data.result.jump){
          var openidurl=data.result.url;
          location.href=openidurl;
        }
        else{
        }
      },  
      error : function() {
      }  
    });
  }

  if(storage.getItem("h5_weixin_openid_umengchannel")==storage.getItem("h5_umengchannel")){
    h5_weixin_openid=storage.getItem("h5_weixin_openid");
  }
  
  //唯一标识这里暂时用weixin_openid
  if(h5_weixin_openid!=null&&h5_weixin_openid!=""&&h5_weixin_openid!="undefined"){
    h5_weiyibiaoshi=h5_weixin_openid;
  }
  
  if(h5_weixin_openid!=null&&h5_weixin_openid!=""&&h5_weixin_openid!="undefined"&&h5_mobile!=null&&h5_mobile!=""&&h5_mobile!="undefined"){

    h5_updata_openid_cishu=storage.getItem("h5_updata_openid_cishu");
    if(h5_updata_openid_cishu==""||h5_updata_openid_cishu==null||h5_updata_openid_cishu=="undefined"){
      h5_updata_openid_cishu=0;//初始化上传次数0
      storage.setItem("h5_updata_openid_cishu",h5_updata_openid_cishu);
    }
    if(storage.getItem("h5_updata_openid_cishu")==0){
      updata_openid();//拿到后上传微信openid
    }
  }
  
  function updata_openid(){
    h5_mobile=storage.getItem("h5_mobile");
    $.ajax(
    {
      type:'post',  
      url : '/wx-openapi/api/wx',
      async: false,//使用同步的方式,AJAX执行完才会进行其他函数,true为异步方式
      dataType : 'json',  
      data:{
        serCode:'10075',
        dataMsg:'{"mobile":"'+h5_mobile+'","openid":"'+h5_weixin_openid+'"}'
      },
      success : function(data) {
        h5_updata_openid_cishu=1;
        storage.setItem("h5_updata_openid_cishu",h5_updata_openid_cishu);
      },  
      error : function() {
      }  
    });
  }

  

  //定位信息
  key_user_dingwei_city= storage.getItem("key_user_dingwei_city");
  key_user_dingwei_point_lat= storage.getItem("key_user_dingwei_point_lat");
  key_user_dingwei_point_lon= storage.getItem("key_user_dingwei_point_lon");
  
  if(key_user_dingwei_city!=""&&key_user_dingwei_city!=null&&key_user_dingwei_city!="undefined") {
    erminalCode={"appname":"借了吗_微信","appversion":"2.3","ostype":phonetype,"type":"3","umengchannel":h5_umengchannel,"city":key_user_dingwei_city,"lat":key_user_dingwei_point_lat,"lng":key_user_dingwei_point_lon};
    erminalCode2={"appname":"借了吗_微信","appversion":"2.3","ostype":phonetype,"type":phonetype,"umengchannel":h5_umengchannel,"city":key_user_dingwei_city,"lat":key_user_dingwei_point_lat,"lng":key_user_dingwei_point_lon};
    erminalCode_mybill={"appname":"借了吗_微信","appversion":"2.3","ostype":phonetype,"type":phonetype,"apptype":"weixin","umengchannel":h5_umengchannel};
  }
  
  //加载登陆窗口
  var tachuang_login_html=
    '<div class="tanchuang_login_box">'+
    ' <div class="tanchuang_login_close"></div>'+
    ' <div class="tanchuang_login_box_title">身份验证</div>'+
    ' <div class="tanchuang_login_box_tel">'+
    '   <div class="tanchuang_login_box_tel_icon"></div>'+
    '   <div class="tanchuang_login_box_tel_input"><input type="tel" maxlength="11" id="tanchuang_login_input_tel" placeholder="请输入您的手机号码" /></div>'+
    ' </div>'+
    ' <div class="tanchuang_login_box_yzm">'+
    '   <div class="tanchuang_login_box_yzm_icon"></div>'+
    '   <div class="tanchuang_login_box_yzm_input"><input type="tel" maxlength="4" id="tanchuang_login_input_yzm" placeholder="请输入短信验证码" /></div>'+
    '   <div class="tanchuang_login_box_yzm_line"></div>'+
    '   <div class="tanchuang_login_box_yzm_huoqu"><span id="tanchuang_login_input_yzm_huoqu">获取验证码</span></div>'+
    ' </div>'+
    ' <div class="tanchuang_login_tishi"></div>'+
    ' <div class="tanchuang_login_btn_login"><a>验证</a></div>'+
    '</div>';
  $(".tanchuang_login").html(tachuang_login_html);
  $(".tanchuang_login").css("display","none");  

  $(".winHeights").height(winHeights-88);//屏幕高度-导航栏高度
  $(".minHeights").css("min-height",winHeights-88);//有顶部的最小高度 屏幕高度-88
  $(".minHeights2").css("min-height",winHeights);//无顶部的最小高度 屏幕高度
  $(".minHeights3").css("min-height",winHeights-98);//无顶部,有底部的最小高度 屏幕高度

  //获取服务器时间
  function getServerDate(){
    var xhr = null;
    if(window.XMLHttpRequest){
      xhr = new window.XMLHttpRequest();
    }
    else{
      xhr = new ActiveObject("Microsoft")
    }
    xhr.open("GET","/",false);
    xhr.send(null);
    var date = xhr.getResponseHeader("Date");
    date = new Date(date);
    return formatDate(date);//转成标准时间格式
  }
  
  function formatTen(num) { 
    return num > 9 ? (num + "") : ("0" + num); 
  }

  function formatDate(date) { 
    var year = date.getFullYear(); 
    var month = date.getMonth() + 1;
    var day = date.getDate(); 
    var hour = date.getHours(); 
    var minute = date.getMinutes(); 
    var second = date.getSeconds(); 
    return year+"-"+formatTen(month)+"-"+formatTen(day)+ " " +hour+":"+minute+":"+second; 
  }

  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
  //客户端Base64编码
  function base64encode(str) {
      var out, i, len;
      var c1, c2, c3;
      len = str.length;
      i = 0;
      out = "";
      while(i < len) {
   c1 = str.charCodeAt(i++) & 0xff;
   if(i == len)
   {
       out += base64EncodeChars.charAt(c1 >> 2);
       out += base64EncodeChars.charAt((c1 & 0x3) << 4);
       out += "==";
       break;
   }
   c2 = str.charCodeAt(i++);
   if(i == len)
   {
       out += base64EncodeChars.charAt(c1 >> 2);
       out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
       out += base64EncodeChars.charAt((c2 & 0xF) << 2);
       out += "=";
       break;
   }
   c3 = str.charCodeAt(i++);
   out += base64EncodeChars.charAt(c1 >> 2);
   out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
   out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
   out += base64EncodeChars.charAt(c3 & 0x3F);
      }
      return out;
  }
  //客户端Base64解码
  function base64decode(str) {
      var c1, c2, c3, c4;
      var i, len, out;
      len = str.length;
      i = 0;
      out = "";
      while(i < len) {
   // c1 
   do {
       c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
   } while(i < len && c1 == -1);
   if(c1 == -1)
       break;
   //c2 
   do {
       c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
   } while(i < len && c2 == -1);
   if(c2 == -1)
       break;
   out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
   // c3
   do {
       c3 = str.charCodeAt(i++) & 0xff;
       if(c3 == 61)
    return out;
       c3 = base64DecodeChars[c3];
   } while(i < len && c3 == -1);
   if(c3 == -1)
       break;
   out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
   // c4 
   do {
       c4 = str.charCodeAt(i++) & 0xff;
       if(c4 == 61)
    return out;
       c4 = base64DecodeChars[c4];
   } while(i < len && c4 == -1);
   if(c4 == -1)break;
   out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
   }
      return out;
  }

  if(theRequest["wt"]!=""&&theRequest["wt"]!=null&&theRequest["wt"]!="undefined"){
    if(theRequest["wt"].length==7){
      if(theRequest["wt"].substr(6,1)=="a"||theRequest["wt"].substr(6,1)=="b"||theRequest["wt"].substr(6,1)=="c"||theRequest["wt"].substr(6,1)=="d"||theRequest["wt"].substr(6,1)=="e"||theRequest["wt"].substr(6,1)=="f"||theRequest["wt"].substr(6,1)=="g"||theRequest["wt"].substr(6,1)=="h"||theRequest["wt"].substr(6,1)=="s"){
        updata_weixin_yuanwen();//微信阅读原文进来，单独上传一次统计
      }
    }
  }
  
  //打开页面上传数据
  function updata_weixin_yuanwen(){
    var clicktime=getServerDate();
    var base64url=base64encode(location.href);
    var dataMsg={"url":base64url,"clicktime":clicktime,"openid":h5_weixin_openid,"moblietype":phone_type};
    
    $.ajax(
    {
      type:'post',
      url : ajaxurl_weixin,
      async: true,//使用同步的方式,AJAX执行完才会进行其他函数,true为异步方式
      dataType : 'json',  
      data:{
        serCode:'10082',
        dataMsg:JSON.stringify(dataMsg)
      },
      success : function(data){
        //console.log(JSON.stringify(data));
      },  
      error : function() {
      }
    });
  }

});