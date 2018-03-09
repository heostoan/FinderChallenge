/*
 constants and global functions
 */

var JSON_FILE = 'books-schema.json';

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', JSON_FILE, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var inputSearch = document.getElementById("txtSearch");
var awesomplete = new Awesomplete(inputSearch, {
    minChars: 3,
    maxItems: 7,
    autoFirst: true
});

function loadData(val = '') {
    loadJSON(function (response) {

        var actually_JSON = JSON.parse(response);
        var StringHtml = '';
        var listSearch = [];
        document.getElementById("listBook").innerHTML = '';

        for (var i = 0; i < actually_JSON['data'].length; i++) {
            listSearch.push(actually_JSON['data'][i]['title']);

            if (val == '') {
                if (i < 9) {
                    StringHtml += '<article class="optionBook">';
                    StringHtml += '<div class="imgBook">';
                    StringHtml += actually_JSON['data'][i]['title'];
                    StringHtml += '</div>';
                    StringHtml += '<p class="titleBook">';
                    StringHtml += actually_JSON['data'][i]['title'];
                    StringHtml += '</p>';
                    StringHtml += '<p class="descriptionBook">';
                    StringHtml += actually_JSON['data'][i]['teaser'];
                    StringHtml += '</p>';
                    StringHtml += '</article>';
                }
            } else {
                var n = actually_JSON['data'][i]['title'].search(val);

                if (n >= 0) {
                    if (i < 9) {
                        StringHtml += '<article class="optionBook">';
                        StringHtml += '<div class="imgBook">';
                        StringHtml += actually_JSON['data'][i]['title'];
                        StringHtml += '</div>';
                        StringHtml += '<p class="titleBook">';
                        StringHtml += actually_JSON['data'][i]['title'];
                        StringHtml += '</p>';
                        StringHtml += '<p class="descriptionBook">';
                        StringHtml += actually_JSON['data'][i]['teaser'];
                        StringHtml += '</p>';
                        StringHtml += '</article>';
                    }
                }

            }
            document.getElementById("listBook").innerHTML = StringHtml;
        }

        awesomplete.list = listSearch;
    });
}

function disableSearch() {
    document.getElementById("btnSearch").disabled = true;
}

function enableSearch() {
    document.getElementById("btnSearch").disabled = false;
}

document.getElementById("txtSearch").onkeypress = function (e) {
    if (document.getElementById("txtSearch").value.length + 1 >= 2) {
        enableSearch();
        if (e.which == 13 || event.keyCode == 13) {
            searchForm();
        }
    } else {
        disableSearch();
    }
};

document.getElementById("btnSearch").onclick = function () {
    searchForm();
}