$(document).ready(function () {

    init();
})


function init() {
    if (pageSize == null || page == null) {
        page = 0;
        pageSize = 15;
    }
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: "/listbypage?pageSize=" + pageSize + "&page=" + page,
        success: function (result) {
            console.log(result)
            var data = result.data.listnews;
            for (var i = 0; i < data.length; i++) {
                newList += '<tr>' +
                    '<td>' + data[i].id + '</td>' +
                    '<td>' +
                    '<a href="#">' + data[i].title + '</a>' +
                    '</td>' +
                    '<td class="am-hide-sm-only">' + Format(new Date(data[i].createtime), "yyyy-MM-dd hh:mm:ss") + '</td>' +
                    '<td>' +
                    '<div class="am-btn-toolbar">' +
                    '<div class="am-btn-group am-btn-group-xs">' +
                    '<button class="am-btn am-btn-default am-btn-xs am-text-secondary" ><span class="am-icon-pencil-square-o"></span><a href="/edit?id='+data[i].id+'">编辑</a> </button>' +
                    '<button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only" onclick="deletenew('+data[i].id+')"><span class="am-icon-trash-o"></span> 删除</button>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</tr>';

            }
            for (var y = 0; y <=result.data.page; y++) {
                if (result.data.page == y) {
                    pagelist += '<li class="am-active">' +
                        '<a href="">' + (y + 1) + '</a>' +
                        '</li>'
                } else {
                    pagelist += '<li class="">' +
                        '<a href="#">' + (y + 1) + '</a>' +
                        '</li>'
                }
            }
            $("#pagelist").append(pagelist);
            $("#newList").append(newList);
            $("#pageSize").text("共  " + result.data.total + " 条记录");
            localStorage.setItem('name',result.name);
            localStorage.setItem('name',result.name);
            localStorage.setItem('name',result.name);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var resultJson = eval('(' + XMLHttpRequest.responseText + ')');

        }
    })

}
