var pagelist = "";
var newList = "";
var pageSize = localStorage.getItem("pageSize");
var page = localStorage.getItem("page");

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
function Format(now, mask) {
    var d = now;
    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };

    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return d.getDate();
            case 'dd':
                return zeroize(d.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
            case 'M':
                return d.getMonth() + 1;
            case 'MM':
                return zeroize(d.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
            case 'yy':
                return String(d.getFullYear()).substr(2);
            case 'yyyy':
                return d.getFullYear();
            case 'h':
                return d.getHours() % 12 || 12;
            case 'hh':
                return zeroize(d.getHours() % 12 || 12);
            case 'H':
                return d.getHours();
            case 'HH':
                return zeroize(d.getHours());
            case 'm':
                return d.getMinutes();
            case 'mm':
                return zeroize(d.getMinutes());
            case 's':
                return d.getSeconds();
            case 'ss':
                return zeroize(d.getSeconds());
            case 'l':
                return zeroize(d.getMilliseconds(), 3);
            case 'L':
                var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(m);
            case 'tt':
                return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z':
                return d.toUTCString().match(/[A-Z]+$/);
            default:
                return $0.substr(1, $0.length - 2);
        }
    });
};

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function deletenew(id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: "/deleteNews?id=" + id,
        success: function (result) {
            if(result.code==200) {
                alert("删除成功");
                init();
            }else {
                alert(result.message+"删除失败!!!");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var resultJson = eval('(' + XMLHttpRequest.responseText + ')');
            alert("删除失败")
        }
    })
}


