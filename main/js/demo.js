$(function(){
	//获取location中指定值
	function getLocationValue(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  decodeURI(r[2]); return null;
	}
	var cId = getLocationValue("cId");    //直接获取url中的字段值
	var cBelongto = getLocationValue("belongto"); 

	//ajax读取JSON文件中的数据
	$.ajax({
   		url: "./js/webData.json",//json文件位置
   		type: "GET",
   		dataType: "json",     //返回数据格式为json
   		success: function(data){
			if(data.webName.length!=0){
				var htmlOther="";
				for(var i=0;i<data.webName.length;i++){
					var childObj=data.webName[i].children;
					for(var j=0;j<childObj.length;j++){
						if(childObj[j].id==cId){
							$(".conDiv iframe").attr("src",childObj[j].ifmSrc);
						}else{
							if(childObj[j].belongto==cBelongto){
								htmlOther+="<a class='AboutIt' href='./demo.html?cId="+childObj[j].id+"&belongto="+childObj[j].belongto+"'>"+childObj[j].name+"</a>";
							}
						}
					}
				}
				$(".pageTurn").append(htmlOther);
			}
   			
	    }
	})
	
	
	//ajax实现文件下载
	$('#downBtn').click(function(){
		var tt = new Date().getTime();
		var url = 'D://User/Documents/HBuilderProject/WebComponent/demo';
 
	/**
	* 使用form表单来发送请求
	* 1.method属性用来设置请求的类型——post还是get
	* 2.action属性用来设置请求路径。
	* 
	*/
	var form=$("<form>");//定义一个form表单
	form.attr("style","display:none");
	form.attr("target","");
	form.attr("method","get");  //请求类型
	form.attr("action",url);   //请求地址
	$("body").append(form);//将表单放置在web中
 

	/*
	 * input标签主要用来传递请求所需的参数：
	 * name属性是传递请求所需的参数名.
	 * value属性是传递请求所需的参数值.
	 * 当为get类型时，请求所需的参数用input标签来传递，直接写在URL后面是无效的。
	 * 当为post类型时，queryString参数直接写在URL后面，formData参数则用input标签传递
	 * 有多少数据则使用多少input标签
	 * */
    var input1=$("<input>");
    input1.attr("type","hidden");
    input1.attr("name","tt");
    form.append(input1);
 
    var input2=$("<input>");
    input2.attr("type","hidden");
    input2.attr("name","Carousel");
    form.append(input2);
 
    form.submit();//表单提交
 })      
	
})
