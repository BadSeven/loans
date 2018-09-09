


// $(document).ready(function () {
//
//
//
// })

function login() {
    var params={
        "name":$("#username").val(),
        "password":$("#password").val()
    }
    console.log(params);
    $.ajax({
        type: "POST",
        dataType: "json",
        data:JSON.stringify(params),
    	contentType: "application/json",
        url: "/user/login",
        success: function (result){
        	localStorage.setItem('name',result.name);
            window.location.href = "/admin/index.html";
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        var resultJson = eval('(' + XMLHttpRequest.responseText + ')');

    }
})
	
}