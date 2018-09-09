var browser=navigator.appName;
var b_version=navigator.appVersion;
var version=b_version.split(";");
var trim_Version=version[1].replace(/[ ]/g,"");
//getAddr();
//百度地图获取坐标
function getAddr() {
  var geolocation = new BMap.Geolocation();
  var pt;
  geolocation.getCurrentPosition(function (r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //setCookie("localX", r.point.lng);
      //setCookie("localY", r.point.lat);
      //alert(r.point.lng + "," + r.point.lat);
      var lat = r.point.lat;//纬度
      var lon = r.point.lng;//经度
      storage.setItem("key_user_dingwei_point_lat",lat);//储存用户定位纬度(纬度在前)
      storage.setItem("key_user_dingwei_point_lon",lon);//储存用户定位经度(纬度在前)
      pt = r;
      showPosition(pt);
      //传参数给地图按钮
      //document.getElementById("alinkMap").href += "&x="+r.point.lng+"&y="+r.point.lat;
      //document.getElementById("alinkMap").style.display="block";
    }
  });
}
//百度地图WebAPI 坐标转地址
function showPosition(r) {
  // ak = appkey 访问次数流量有限制
  var url = 'http://api.map.baidu.com/geocoder/v2/?ak=47RonYhZqoYknVOSVODDtaiBksAnhAHG&callback=?&location=' + r.point.lat + ',' + r.point.lng + '&output=json&pois=1';
  $.getJSON(url, function (res) {
    //$("#msg").html(url);
    //alert(res.result.addressComponent.city);
    dingwei_city = res.result.addressComponent.city;
    storage.setItem("key_user_dingwei_city",dingwei_city);//储存用户定位城市
  });
}
//百度地图JS API 坐标转地址，没有加载地图时获取不到rs,总是null
function getLocation(myGeo,pt,rs) {
  // 根据坐标得到地址描述 
  myGeo.getLocation(pt, function (rs) {
    if (rs) {
      var addComp = rs.addressComponents;
      window.clearInterval(interval);
      //alert(addComp);
    }
    return rs;
  });
}
/*
if(trim_Version!="MSIE6.0" && trim_Version!="MSIE7.0" && trim_Version!="MSIE8.0")
{ 
	//baidu javascript API
	navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;//纬度
    var lon = position.coords.longitude;//经度
    var point = new BMap.Point(lon, lat);  // 创建坐标点
    // 根据坐标得到地址描述
    var myGeo = new BMap.Geocoder();
    myGeo.getLocation(point, function (result) {
      dingwei_city = result.addressComponents.city;
      storage.setItem("key_user_dingwei_city",dingwei_city);//储存用户定位城市
      storage.setItem("key_user_dingwei_point_lat",lat);//储存用户定位纬度(纬度在前)
      storage.setItem("key_user_dingwei_point_lon",lon);//储存用户定位经度(纬度在前)
    });
	});
}
*/
$(document).ready(function () {
	//先加载loading动画
	loadinggif();

  //左上角返回
  $(".top").on("click",'a.top_back',function(){
    location.href="index.html?umengchannel="+h5_umengchannel; /*我注释的*/
  });
  
  if(h5_umengchannel=="weixin_jlm_01"){
    //20171031 10:28  weixin_jlm02隐藏底部下载  
    $(".bottom_appdown").css("display","block");
    $(".bottom_appdown_zhanwei").css("display","block");
    $(".bottom_appdown").animate({ bottom:"0"},300);
  }
  else if(h5_umengchannel=="weixin26"){
    $(".bottom_appdown").css("display","block");
    $(".btttom_appdown_icon img").attr("src","images/icon_jqb.png");
    $(".bottom_appdown_zhanwei").css("display","block");
    $(".bottom_appdown").animate({ bottom:"0"},300);
  }
  else if(h5_umengchannel=="weixin15"||h5_umengchannel=="weixin16"||h5_umengchannel=="weixin17"||h5_umengchannel=="weixin18"||h5_umengchannel=="weixin20"||h5_umengchannel=="weixin22"||h5_umengchannel=="weixin25"||h5_umengchannel=="weixin30"||h5_umengchannel=="weixin32"||h5_umengchannel=="weixin51"||h5_umengchannel=="weixin56"||h5_umengchannel=="weixin74"||h5_umengchannel=="weixin75"){
    $(".more_shenqing").css("display","none");
    if(theRequest["wt"]){
      location.href="http://wx.jielema.com/iotglb-openapi/html/weixin_jlm/list2.html?this_category=wx_1&shownum=10&umengchannel="+h5_umengchannel+"&wt="+theRequest["wt"];
    }
    else{
      location.href="http://wx.jielema.com/iotglb-openapi/html/weixin_jlm/list2.html?this_category=wx_1&shownum=10&umengchannel="+h5_umengchannel;
    }
  }
  /*
  //20171031 10:28  weixin14隐藏底部下载
  else if(h5_umengchannel=="weixin14"){
    $(".bottom_appdown").css("display","block");
    $(".btttom_appdown_icon img").attr("src","images/icon_jlm.png");
    $(".btttom_appdown_title").text("极速贷款");
    $(".btttom_appdown_txt").text("登录APP，更多精彩等你来");
    $(".bottom_appdown_zhanwei").css("display","block");
    $(".bottom_appdown").animate({ bottom:"0"},300);
  }
  */
  else{
    $(".more_shenqing").css("display","none");
  }
  
  var this_category_wx;//微信单独排序
  
  var this_category;
  this_category=theRequest["this_category"];
  if(theRequest["this_category"]!=""&&theRequest["this_category"]!=null&&theRequest["this_category"]!="undefined"){
  	this_category=theRequest["this_category"];
  }
  else if(storage.getItem("this_category")!=""&&storage.getItem("this_category")!=null&&storage.getItem("this_category")!="undefined"){
  	this_category=storage.getItem("this_category");
  }
  else{
  	//location.href="index.html?umengchannel="+h5_umengchannel; /*我注释的*/
  }
  
  this_category_bianhua();//this_category改变则执行一次
  function this_category_bianhua(){
  	if(this_category=="0"){
  		module=21;
  		thispagenumber="1";//快速微额贷
  		this_category_wx="wx_kswed";
  	}
  	else if(this_category=="1"){
  		module=22;
  		thispagenumber="2";//热门极速贷
  		this_category_wx="wx_rmjsd";
  	}
  	else if(this_category=="2"){
  		module=23;
  		thispagenumber="3";//信用卡贷款
  		this_category_wx="wx_xykdk";
  		/*
      if(h5_umengchannel=="weixin17"||h5_umengchannel=="weixin24"||h5_umengchannel=="weixin26"||h5_umengchannel=="weixin38"){
  			this_category_wx="wxhd_xykdk"; //这几个公众号活动期间显示图标有修改
  		}
      */
  	}
  	else if(this_category=="3"){
  		module=24;
  		thispagenumber="4";//大学生贷款
  		this_category_wx="wx_dxsdk";
  	}
  	else if(this_category=="4"){
  		module=26;
  		thispagenumber="5";//车贷创业贷
  		this_category_wx="wx_cdcyd";
  	}
  	else if(this_category=="5"){
  		module=25;
  		thispagenumber="6";//贷款搜索平台
  		this_category_wx="";
  	}
    else if(this_category=="xpzq"){
      module="xpzq";
      thispagenumber="83";//新品专区
      this_category_wx="xpzq";
    }

  }
  
	//动画
	var slide_left;
	$(".list_menu_bottomline").css("left","-200px");
	function list_menu_bottomline(slide_left) {
		if(this_category==0){
			slide_left="0";
		}
		else if(this_category==1){
			slide_left="192px";
		}
		else if(this_category==2){
			slide_left="384px";
		}
		else if(this_category==3){
			slide_left="-250px";
		}
		else if(this_category==4){
			slide_left="-250px";
		}
		else if(this_category==5){
			slide_left="-250px";
		}
		$(".list_menu_bottomline").animate({ left:slide_left},300);
	}

	//判断当前页面，隐藏URL，显示文字颜色
	$(".list_menu li").each(function(){
  	if($(this).attr("data-menu_category")==this_category){
  		$(this).addClass("list_menu_li_curr");
  	}
  });

	//列表菜单-点击-跳转页面
	$(".list_menu").on("click",'.list_menu_li',function(){
		var jump_category=$(this).attr("data-menu_category");
		if(jump_category=="0"){
  		jumppagenumber="1";//快速微额贷
  	}
  	else if(jump_category=="1"){
  		jumppagenumber="2";//热门极速贷
  	}
  	else if(jump_category=="2"){
  		jumppagenumber="3";//信用卡贷款
  	}
  	$(".list_menu li").removeClass("list_menu_li_curr");
  	$(this).addClass("list_menu_li_curr");
  	//点击菜单按钮 不等于当前页面时，才跳转页面
  	if(jump_category!=this_category){
  		//运营统计
			click_id="";
			click_weizhi="click";
  		yw_click();
  		
  		this_category=jump_category;
  		this_category_bianhua();//this_category改变则执行一次
  		
  		home_prolist();//刷新产品
  	}
	});
	
	home_banner();
	function home_banner(){
		$.ajax(
		{
		  type:'post',  
      url : ajaxurl,
      async: false,
      dataType : 'json',  
      data:{
        serCode:'10016',
        token:h5_token,
        dataMsg:'{"type":"3"}',//type:3为微信广告位
				erminalCode:JSON.stringify(erminalCode)
      },
      success  : function(data) {
				var homebannerArray=new Array();
				//$(".indexbanner").empty();//清空之前的内容
				$.each(data.resultList.rows, function(i, homebanner){
					if(homebanner.bak!=""&&homebanner.bak!=null&&homebanner.bak!="undefined"){
        	  pro_url=homebanner.bak;
        	}
          if(data.resultList.rows.length==1){
            var homebanner_imagepath=homebanner.imagepath;
            
            if(h5_umengchannel=="weixin_jlm_02"){
              homebanner_imagepath="images/home_banner1_weixin_jlm_02.png";
            }
            else if(h5_umengchannel=="weixin12"){
              homebanner_imagepath="images/home_banner1_weixin12.png";
            }
            else if(h5_umengchannel=="weixin14"){
              homebanner_imagepath="images/home_banner1_weixin14.png";
            }
            else if(h5_umengchannel=="weixin16"){
              homebanner_imagepath="images/home_banner1_weixin16.png";
            }
            else if(h5_umengchannel=="weixin17"){
              homebanner_imagepath="images/home_banner1_weixin17.png";
            }
            else if(h5_umengchannel=="weixin19"){
              homebanner_imagepath="images/home_banner1_weixin19.png";
            }
            else if(h5_umengchannel=="weixin24"){
              homebanner_imagepath="images/home_banner1_weixin24.png";
            }
            else if(h5_umengchannel=="weixin30"){
              homebanner_imagepath="images/home_banner1_weixin30.png";
            }
            else if(h5_umengchannel=="weixin35"){
              homebanner_imagepath="images/home_banner1_weixin35.png";
            }
            else if(h5_umengchannel=="weixin51"){
              homebanner_imagepath="images/home_banner1_weixin51.png";
            }
            else if(h5_umengchannel=="weixin74"){
              homebanner_imagepath="images/home_banner1_weixin74.png";
            }
            
            $(".banner").html('<li><a data-banner_id="'+homebanner.id+'" rel="'+pro_url+'" title="'+homebanner.reamrk+'"><img src="'+homebanner_imagepath+'" alt="'+homebanner.reamrk+'"></a></li>');
          }
          else{
            var homebanner_imagepath=homebanner.imagepath;
            homebannerArray[i]='<div class="swiper-slide"><li><a data-banner_id="'+homebanner.id+'" rel="'+pro_url+'" title="'+homebanner.reamrk+'"><img src="'+homebanner_imagepath+'" alt="'+homebanner.reamrk+'"></a></li>';
            $(".indexbanner").append(homebannerArray[i]);
          }
					
				});
      },
      error : function(){ 
        //alert('fail');
    	}  
		});
		if(trim_Version!="MSIE6.0" && trim_Version!="MSIE7.0" && trim_Version!="MSIE8.0") 
		{
			//广告图片运行完后再加载下面代码，才能计算数量轮播
			var swiper_banner = new Swiper('.swiper-container-banner', {
      		pagination: '.swiper-pagination-banner',
     			slidesPerView: 1,
      		paginationClickable: true,
      		centeredSlides: true,
      		autoplay: 2500,
      		autoplayDisableOnInteraction: false,
      		loop: true
    	});
		}
	}

	home_prolist();//刷新产品列表
  //获取产品列表
	function home_prolist(){
		loadinggif();
		var dataMsg={"category":this_category_wx};
		$.ajax(  
		{
			type:'post',  
			url : ajaxurl,
			dataType : 'json',
			data:{
				serCode:'10058',
				token:h5_token,
				erminalCode:JSON.stringify(erminalCode),
				dataMsg:JSON.stringify(dataMsg),
				pageSize:'100'
			},
			success : function(data) {
        //console.log(JSON.stringify(data));
				var dataObj=data.resultList;
				var listpro1Array=new Array();
				$(".home_pro").empty();//清空之前的产品内容
				$.each(dataObj.rows, function(i, prolist){
					if(prolist.ratetype==1&&prolist.jumptype!=4&&prolist.jumptype!=5){
            //prolist.id!=149&&prolist.id!=153&&prolist.id!=202
						//ratetype=1月利率
						listpro1Array[i]=
						'<li id="'+prolist.id+'" data-jumptype="'+prolist.jumptype+'">'+
						'	<a rel="'+prolist.wxcompany+'">'+
						'		<div class="home_pro_img"><img src="'+prolist.imagepath+'" alt="'+prolist.name+'"></div>'+
						'		<div class="home_pro_r">'+
						'			<div class="home_pro_title">'+prolist.name+'</div>'+
						'			<div class="home_pro_txt1">'+prolist.weixindetail+'</div>'+
						'			<div class="home_pro_txt2"><div class="w260 fl">申请人数<span class="pl10 c_fb4e44">'+prolist.joincount+'人</span></div><div class="w220 fr" style="display:none">月利率<span class="pl10 c_fb4e44">%</span></div></div>'+
						'		</div>'+
						'	</a>'+
						'</li>';
					}
					else if(prolist.ratetype==2&&prolist.jumptype!=4&&prolist.jumptype!=5){
						//ratetype=2日利率
						listpro1Array[i]=
						'<li id="'+prolist.id+'" data-jumptype="'+prolist.jumptype+'">'+
						'	<a rel="'+prolist.wxcompany+'">'+
						'		<div class="home_pro_img"><img src="'+prolist.imagepath+'" alt="'+prolist.name+'"></div>'+
						'		<div class="home_pro_r">'+
						'			<div class="home_pro_title">'+prolist.name+'</div>'+
						'			<div class="home_pro_txt1">'+prolist.weixindetail+'</div>'+
						'			<div class="home_pro_txt2"><div class="w260 fl">申请人数<span class="pl10 c_fb4e44">'+prolist.joincount+'人</span></div><div class="w220 fr" style="display:none">日利率<span class="pl10 c_fb4e44">%</span></div></div>'+
						'		</div>'+
						'	</a>'+
						'</li>';
					}
					/*
					if(prolist.templet==""||prolist.templet==null||prolist.templet=="undefined"){
						//跳模板页面不显示
						$(".home_pro").append(listpro1Array[i]);
					}
					*/
					$(".home_pro").append(listpro1Array[i]);
					
				});
				subSomething();
				list_menu_bottomline(slide_left);
			},
			error : function() {
        //alert('fail'); 
     	}
  	});
	}
	
	/*
	//判断用户是否进入过产品页面，则弹窗
    pro_id=storage.getItem("key_pro_id");
    if(pro_id!=null&&pro_id!="undefined"&&pro_id!=""){
    	if (ua.match(/ipad|ios|iphone/i)) {
		//iphone
		show_pro_tanchuang();//IOS系统才弹窗
    	}
    }

    //显示用户提交订单选项弹窗
    function show_pro_tanchuang(){
    	$(".winbox").css({"height":winHeights,"overflow":"hidden"});//弹窗后禁止外部层超过屏幕高度滚动
        $(".zhezhao").css("display","block");
        $(".tanchuang_pro_xuanfu").css("display","block");
    }

    //弹窗点击选项
	$(".tanchuang_pro_info").on("click",'.tanchuang_pro_info_xx',function(){
		$(".tanchuang_pro_info_xx").removeClass("tanchuang_pro_info_xx_curr");
		$(this).addClass("tanchuang_pro_info_xx_curr");
	});
	//确认选项
	$(".tanchuang_pro_btn").on("click",'.tanchuang_pro_btn_ture',function(){
		//根据用户选择是否提交资料，生成订单
		var tanchuang_pro_info_xx_curr_id=$(".tanchuang_pro_info .tanchuang_pro_info_xx_curr").attr("id");
		if(tanchuang_pro_info_xx_curr_id=="tanchuang_pro_info_xx1"){
			up_dingdan_ok();
			close_pro_tanchuang();
		}
		else{
			close_pro_tanchuang();
		}
	});
	
	function up_dingdan_ok(){
		//弹窗问题选择
		var pro_dingdan_id=storage.getItem("key_pro_dingdan_id");
		pro_id=storage.getItem("key_pro_id");
		var user_quesion=0;//0 为用户已提交，H5只有已提交
		var	remark=1;//1为产品，2为信用卡
		var dataMsg={"id":pro_dingdan_id,"productid":pro_id,"userquesion":user_quesion,"remark":remark};

		$.ajax(  
		{
		    type:'post',  
        	url : ajaxurl,  
        	async: false,
        	dataType : 'json',  
        	data:{
        		serCode:'10033',
        		token:h5_token,
				erminalCode:JSON.stringify(erminalCode),
        		dataMsg:JSON.stringify(dataMsg)
        	} ,
        	success  : function(data) {
        		//alert("返回码："+ data.responseCode);
        	}, 
        	error : function() { 
            	//alert('fail');  
        	}  
		});
	}
	
	//关闭用户是否提交订单选项弹窗
	
	function close_pro_tanchuang(){
		$(".winbox").css({"height":"auto","overflow":"visible"});//取消外部层级超过屏幕被隐藏高度
		$(".tanchuang_pro_xuanfu").css("display","none");
        $(".zhezhao").css("display","none");
		storage.removeItem("key_pro_id");
		storage.removeItem("key_pro_dingdan_id");
	}
	*/

	//显示右上角更多内容弹窗
	$(".top").on("click",'a.top_more',function(){
		$(".winbox").css({"height":winHeights,"overflow":"hidden"});//弹窗后禁止外部层超过屏幕高度滚动
       $(".zhezhao").css("display","block");
    	$('.home_more').css("display","block");
    	$(".home_more").removeClass("bounceOutUp");
		$(".home_more").addClass("bounceInDown");
	});
	
	//点击遮罩层关闭 哪个弹窗 判断
	$(".zhezhao").click(function(){
		var this_home_more=$(".home_more").css("display");
		//当home_more弹窗显示时，点击遮罩层才关闭home_more
		if(this_home_more=="block"){
			$(".winbox").css({"height":"auto","overflow":"visible"});//取消外部层级超过屏幕被隐藏高度

			$(".home_more").removeClass("bounceInDown");
			$(".home_more").addClass("bounceOutUp");

			setTimeout(function (){
 				$(".home_more").css("display","none");
        		$(".zhezhao").css("display","none");
   			}, 500); 
		}

		var this_bottom_appdown=$(".bottom_appdown").css("display");
		//当home_more弹窗显示时，点击遮罩层才关闭home_more
		if(this_bottom_appdown=="block"){
			$(".winbox").css({"height":"auto","overflow":"visible"});//取消外部层级超过屏幕被隐藏高度

			$(".bottom_appdown").animate({ bottom:"-100px"},300,function(){
        $(".bottom_appdown").css("display","none");
        $(".bottom_appdown_zhanwei").css("display","none");
        $(".zhezhao").css("display","none");
      });
		}
  });

	//点击弹窗-我的申请：显示底部下载弹窗
	$(".home_more").on("click",'.more_shenqing',function(){
		//运营统计
		click_id="";
		click_weizhi="click";
  	jumppagenumber="8";
  	yw_click();

		$(".home_more").removeClass("bounceInDown");
		$(".home_more").addClass("bounceOutUp");

		setTimeout(function (){
 			$(".home_more").css("display","none");
      //$(".zhezhao").css("display","none");//显示底部弹窗，遮罩层不隐藏
   		}, 500); 

		$(".bottom_appdown").css("display","block");
    $(".bottom_appdown_zhanwei").css("display","block");
		$(".bottom_appdown").animate({ bottom:"0"},300);

	});

  //点击下载APP按钮
  $(".btttom_appdown_down").on("click",'a',function(){
    //运营统计
    click_id="";
    click_weizhi="click";
    jumppagenumber="9";
    yw_click();
    
    //微下载链接
    if(h5_umengchannel=="weixin_jlm_01"||h5_umengchannel=="weixin_jlm_02"){
      //借了吗
      location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.iot.glb&ckey=CK1360777800875";
    }
    else if(h5_umengchannel=="weixin24"){
      //现金贷
      location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.duorong.xianjingdai&ckey=CK1368123182751";
    }
    else if(h5_umengchannel=="weixin26"){
      //借钱吧
      location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.duorong.jielema&ckey=CK1368125346780";
    }
    else if(h5_umengchannel=="weixin12"){
      //小贷款
      location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.iot.glb&ckey=CK1369851030549";
    }
    else if(h5_umengchannel=="weixin14"){
      //借贷分期
      location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.iot.glb&ckey=CK1369851680543";
    }
    else{
      //其他下载用借了吗
      location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.iot.glb&ckey=CK1360777800875";
    }
    
  });

  //关闭底部下载弹窗
  $(".bottom_appdown").on("click",'.bottom_appdown_close',function(){
    $(".winbox").css({"height":"auto","overflow":"visible"});//取消外部层级超过屏幕被隐藏高度
    
    $(".bottom_appdown").animate({ bottom:"-100px"},300,function(){
      $(".bottom_appdown").css("display","none");
      $(".bottom_appdown_zhanwei").css("display","none");
      $(".zhezhao").css("display","none");
    });
  });

	//点击弹窗-我的账单
	$(".home_more").on("click",'.more_mybill',function(){
		//运营统计
		click_id="";
		click_weizhi="click";
  	jumppagenumber="61";
  	yw_click();

  	var jumphref=$(this).attr("data-href");
  	location.href=jumphref+"?umengchannel="+h5_umengchannel;
	});

	//点击弹窗-我的浏览
	$(".home_more").on("click",'.more_liulan',function(){
		//运营统计
		click_id="";
		click_weizhi="click";
  	jumppagenumber="14";
  	yw_click();

  	var jumphref=$(this).attr("data-href");
  	location.href=jumphref+"?umengchannel="+h5_umengchannel;
	});

	//点击更多-攻略
	$(".home_more").on("click",'.more_gonglve',function(){
		//运营统计
		click_id="";
		click_weizhi="click";
  	jumppagenumber="10";
  	yw_click();

  	var jumphref=$(this).attr("data-href");
  	location.href=jumphref+"?umengchannel="+h5_umengchannel;
	});

	//点击更多-信用卡
	$(".home_more").on("click",'.more_card',function(){
		//运营统计
		click_id="";
		click_weizhi="click";
  	jumppagenumber="11";
  	yw_click();

  	var jumphref=$(this).attr("data-href");
  	location.href=jumphref+"?umengchannel="+h5_umengchannel;
	});

	//点击更多-关于我们
	$(".home_more").on("click",'.more_about',function(){
		//运营统计
		click_id="";
		click_weizhi="click";
  	jumppagenumber="12";
  	yw_click();

  	var jumphref=$(this).attr("data-href");
  	location.href=jumphref+"?umengchannel="+h5_umengchannel;
	});

	//退出登录
	$(".home_more").on("click",'.more_out',function(){
    h5_token=storage.getItem("h5_token");
		if(h5_token==""||h5_token==null||h5_token=="undefined"){
			tanchuang_tishi2_open("您还未登录！");
			$(".winbox").css({"height":"auto","overflow":"visible"});//取消外部层级超过屏幕被隐藏高度

			$(".home_more").removeClass("bounceInDown");
			$(".home_more").addClass("bounceOutUp");

			setTimeout(function (){
 				$(".home_more").css("display","none");
        $(".zhezhao").css("display","none");
   		},500); 
			return false;
		}
		else{
			//运营统计
			click_id="";
			click_weizhi="click";
  		jumppagenumber="13";
  		yw_click();

			storage.removeItem("h5_token");//清除缓存
      storage.removeItem("h5_mobile");//清除缓存
			tanchuang_tishi2_open("退出登录成功");
      
			$(".winbox").css({"height":"auto","overflow":"visible"});//取消外部层级超过屏幕被隐藏高度

			$(".home_more").removeClass("bounceInDown");
			$(".home_more").addClass("bounceOutUp");
      
			setTimeout(function (){
 				$(".home_more").css("display","none");
        $(".zhezhao").css("display","none");
   		}, 500); 
			
		}
	});

	//banner跳转
	$(".banner").on("click",'li',function(){
		pro_url=$(this).children("a").attr("rel");
		pro_id="";
		banner_id=$(this).children("a").attr("data-banner_id");
		
		//运营统计
		click_id=banner_id;
		click_weizhi="click_ad";
  	jumppagenumber="";
  	yw_click();

  	tongji_pro(banner_id,2);//2:表示banner
  	
		if(h5_token==""||h5_token==null||h5_token=="undefined"){
			location.href="login.html?umengchannel="+h5_umengchannel+"&source_url="+encodeURIComponent(encodeURIComponent(location.href));
		}
		else{
			jumppage();
		}
	})
	
	//点击产品
	$(".home_pro").on("click",'li',function(){
		//存储用户最近一次点过的产品ID,url
		pro_url=$(this).children("a").attr("rel");
		pro_id=$(this).attr("id");
		
		//运营统计
		click_id=pro_id;
		click_weizhi="click_product";
  	jumppagenumber="";
  	yw_click();

		tongji_pro(pro_id,1);
		
		var jumptype=$(this).attr("data-jumptype");
		//jumptype=99不显示详情，直接跳转链接
		if(jumptype!=99){
			location.href="productdetail.html?pro_id="+pro_id+"&module="+module+"&umengchannel="+h5_umengchannel;
			return false;
		}
    else{
      if(h5_token==""||h5_token==null||h5_token=="undefined"){
        location.href="login.html?umengchannel="+h5_umengchannel+"&source_url="+encodeURIComponent(encodeURIComponent(location.href));
      }
      else{
        jumppage();
      }
    }
	});
	
	//跳转页面
	function jumppage(){
		if(pro_id==""||pro_id==null||pro_id=="undefined"){
			//广告图片是只有pro_url 没有pro_id的
			if(pro_url!=""&&pro_url!=null&&pro_url!="undefined"){
				location.href=pro_url;
			}
		}
		if(pro_id!=""&&pro_id!=null&&pro_id!="undefined"){
			click_pro();//生成订单,并针对部分产品需要点击后请求一次后台，拿到更新的pro_url
			if(pro_url!=""&&pro_url!=null&&pro_url!="undefined"){
        location.href=pro_url;
      }
		}
	}
	
  //加载完页面统计一次
  click_weizhi="load";
  load();

});