document.getElementById('myform').addEventListener('submit', saveData);

function saveData(e) {
    var a = document.getElementById('webname').value;
    var b = document.getElementById('weburl').value;
    var data = {
        webname: a,
        weburl: b
    };
    if (localStorage.getItem('webdata') === null) {
        var webdata = [];
        webdata.push(data);
        console.log(webdata);
        localStorage.setItem('webdata', JSON.stringify(webdata));
    } else {
        var webdata = JSON.parse(localStorage.getItem('webdata'));
        webdata.push(data);
        localStorage.setItem('webdata', JSON.stringify(webdata));
    }
    document.getElementById('myform').reset(); //trả về lại hiện trạng ban đầu
    printOutData();
    e.preventDefault();
}

function printOutData() {
    var data = JSON.parse(localStorage.getItem('webdata'));
    var result = document.getElementById('result');
    result.innerHTML = '';
    console.log(data);
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
        var name = data[i].webname;
        var url = data[i].weburl;
        result.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href=' + url + ' >Visit</a> ' +
            ' <a class="btn btn-danger" href="#" onclick="deleteBookmark(\'' + url + '\')">Delete</a> ' +
            '</h3>' +
            '</div>';
    }
}

function deleteBookmark(url) {
    var data = JSON.parse(localStorage.getItem('webdata'));
    for (var i = 0; i < data.length; i++) {
        if (data[i].weburl === url) {
            data.splice(i, 1);
        }
    }
    localStorage.setItem('webdata', JSON.stringify(data));
    printOutData();
}