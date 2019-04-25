$(function () {


    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {
            xhr = null;
        }
        return xhr;
    }

    // //远程
    var request = createCORSRequest("get", "https://api.github.com/users/qydeveloper/following");
    //本地
    //var request = createCORSRequest("get", "book.json");

    if (request) {
        request.onload = function () {
            var data = JSON.parse(request.responseText);
            
            var json = {
                avatar_url:"https://avatars3.githubusercontent.com/u/43518854?s=400&v=4",
                login:"qydeveloper",
                html_url : "https://github.com/qydeveloper"
            }
            data.push(json);
            for (var j = 0; j < data.length; j++) {
                //创建元素ul
                var fragment_ul = document.createDocumentFragment();  //作为仓库
                var ul = document.createElement("ul");
                fragment_ul.appendChild(ul);
                ul.id = "ul" + j;
                document.querySelector('#div3').appendChild(fragment_ul);
                //创建元素li
                var fragment_li = document.createDocumentFragment();
                var li = null;

                var arr = [];


                var len = 3;  //要显示的每一项内容的个数
                for (var i = 0; i < len; i++) {
                    var arr = [];
                    var logo = data[j].avatar_url;  //头像
                    var login = data[j].login;      //名字
                    var html_url = data[j].html_url; //网址
                    arr[0] = logo;
                    arr[1] = login;
                    arr[2] = html_url;

                    li = document.createElement("li");

                    li.id = "ul" + j + 'li' + i;
                    fragment_li.appendChild(li);
                    document.querySelector('#ul' + j).appendChild(fragment_li);
                    //创建元素li里的元素
                    //console.log(arr[i]);
                    if (arr[i] === logo) {
                        var fragment_img = document.createDocumentFragment();
                        var img = null;
                        img = document.createElement("img");
                        img.src = arr[i];
                        fragment_img.appendChild(img);
                        document.querySelector('#ul' + j + 'li' + i).appendChild(fragment_img);
                    } else if (arr[i] === login) {
                        var fragment_p = document.createDocumentFragment();
                        var p = null;
                        p = document.createElement("p");
                        p.innerHTML = arr[i];

                        fragment_p.appendChild(p);
                        document.querySelector('#ul' + j + 'li' + i).appendChild(fragment_p);
                    } else {
                        var fragment_a = document.createDocumentFragment();
                        var a = null;
                        a = document.createElement("a");
                        a.href = arr[i];
                        a.innerHTML = "github";
                        fragment_a.appendChild(a);
                        document.querySelector('#ul' + j + 'li' + i).appendChild(fragment_a);
                    }
                }
            }
        }
        request.send();
    }

});