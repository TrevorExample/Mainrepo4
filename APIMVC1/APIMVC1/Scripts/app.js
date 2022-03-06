

function updateMovieList(text) {
    document.getElementById("movieResults").innerHTML = "";
    const responseMessage = JSON.parse(JSON.parse(text));
    

    if (responseMessage["Response"] =="False") {
        alert(responseMessage["Error"]);
    }
    else {
        
        var movies = responseMessage["Search"];
    for (let i = 0; i < movies.length; i++) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(movies[i].Title);
        node.appendChild(textnode);
        document.getElementById("movieResults").appendChild(node);
        }
    }

}


function callAPI() {

    var searchInput = document.getElementById("searchInput").value;

    if (searchInput == null || searchInput.length === 0 || searchInput === null || searchInput.match(/^ *$/) !== null) {
        alert("search value is empty");
    }
    else {

    var http = new XMLHttpRequest();
    var url = '/Home/CallAPIAsync';
    var params = 'searchValue=' + searchInput;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {

            updateMovieList(http.responseText);
        }
        else if(http.status !== 200){
            alert("Problem retrieving data ");
            console.log(http.responseText);
        }
    }
    http.send(params);
    }
};

