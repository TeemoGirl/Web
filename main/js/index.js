$(function(){
	//树的伸缩
	$("body").delegate(".typeA","click",function(){
		$(this).parent().find(".childUl").toggle();   //控制子节点显隐
		
		//图片src切换
		var imgSrc=$(this).find(".iconImg").attr("src");   
		if(imgSrc=="./img/close.png"){
			$(this).find(".iconImg").attr("src","./img/open.png");
		}else{
			$(this).find(".iconImg").attr("src","./img/close.png");
		}
	})
	
	//li加链接
	$("body").delegate(".childUl>li","click",function(){
		var demoId=$(this).attr("data-id");   //当前点击demo的Id
		var demoBel=$(this).attr("data-belongto");   //当前点击demo的Id
		window.open("./demo.html?cId="+demoId+"&belongto="+demoBel+"");
	})
	
	//ajax读取JSON文件中的数据
	$.ajax({
   		url: "./js/webData.json",//json文件位置
   		type: "GET",
   		dataType: "json", //返回数据格式为json
   		success: function(data){
   			var htmlFather="";
   			$(".fatherUl").empty();	
	       	if(data.webName.length!=0){
	       		for(var i=0;i<data.webName.length;i++){
	       			var htmlChild="";
	       			var childObj=data.webName[i].children;
	       			for(var j=0;j<childObj.length;j++){
	       				htmlChild+="<li data-id="+childObj[j].id+" data-belongto="+childObj[j].belongto+">"+
	       				"<div class='hoverDiv'><span>发布者:"+childObj[j].uploader+"</span><span>发布时间:"+childObj[j].uploadTime+"</span></div>"+
	       				"<span>"+childObj[j].name+"</span></li>";
	       			}
       				htmlFather+="<li>"+
       				"<h1 class='typeA'><img class='iconImg' src='./img/open.png' />"+data.webName[i].name+"</h1>"+
       				"<ul class='childUl'>"+htmlChild+"</ul></li>";
	       		}
	       		$(".fatherUl").append(htmlFather);
	       	}
	    }
	})
	
	//li标签hover样式
	$("body").delegate(".childUl li","mouseenter",function(){
		$(this).find(".hoverDiv").stop().fadeIn("slow");
	})
	$("body").delegate(".childUl li","mouseleave",function(){
		$(this).find(".hoverDiv").stop().fadeOut("fast");
	})
	
	
	
	//搜索功能
	document.onkeydown=function(e){ 
    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13){
	    	search();
		}
   }
    $("#search_button").click(function(){
    	search();
    });
})

//查询函数
function search(){
	var keyWord=$("#input_title").val();
  	if($.trim(keyWord)!=""){
    	$(".childUl li").css("display","none");
    	$(".typeA").css("display","none");
    	$(".childUl li span").filter(":contains('"+keyWord+"')").parent().css("display","inline-block");
  	}else{
  		$(".typeA").css("display","block");
    	$(".childUl li").css("display","inline-block");
  	}
}