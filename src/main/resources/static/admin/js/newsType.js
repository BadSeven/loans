
var imagelist="";
$(document).ready(function () {

    init();
})


function init() {
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: "/getAllimageList",
        success: function (result) {
            console.log(result)
            var data = result.data;
            for (var i = 0; i < data.length; i++) {
                imagelist += "\t<tr>\n" +
                    "\t\t\t\t\t\t<td>"+data[i].id+"</td>\n" +
                    "\t\t\t\t\t\t<td>\n" +
                    "\t\t\t\t\t\t\t<span>"+trname(data[i].type)+"</span>\n" +
                    "\t\t\t\t\t\t</td>\n" +
                    "\t\t\t\t\t\t<td>\n" +
                    "\t\t\t\t\t\t\t<span>"+trname(data[i].name)+"</span>\n" +
                    "\t\t\t\t\t\t</td>\n" +
                    "\t\t\t\t\t\t<td>\n" +
                    "\t\t\t\t\t\t\t<div class=\"am-btn-toolbar\">\n" +
                    "\t\t\t\t\t\t\t\t<a class=\"am-btn-group am-btn-group-xs\">\n" +
                    "\t\t\t\t\t\t\t\t\t<button class=\"am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only\" onclick='deleteImage("+data[i].id+")'><span class=\"am-icon-trash-o\"></span> 删除</button>\n" +
                    "\t\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t</td>\n" +
                    "\t\t\t\t\t</tr>";

            }

            $("#imagelist").append(imagelist);
            $("#totle").text("共  " + result.data.length + " 条记录");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var resultJson = eval('(' + XMLHttpRequest.responseText + ')');

        }
    })

}

function trname(name) {
    if(name=="index"){
        return "首页大图"
    }else if(name=="cp"){
        return "首页产品图"
    }
}
function deleteImage() {
   alert("zzzzzzzz")
    window.open ('editImage');
}
function editImage() {
    alert("zzzzzzzz")
}