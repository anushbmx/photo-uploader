(function () {

    var photoid = window.location.hash ? location.hash.replace(/^#/, "") : "",
        cardimg = document.getElementById("cardimg"),
        photo;

    // Load photos from localforage
    localforage.getItem("photos").then(function (result) {
        if (result) {
            photo = result[photoid];
            if (photo) {
                console.log("Photo retrieved", photo);
                printcard();
            } else {
                show404();
            }
        }
    });

    var printcard = function () {
        console.log("Printing card for photo", photo);
        cardimg.setAttribute("src", URL.createObjectURL(photo.blob));
    };

    var show404 = function () {
        console.log("404. Invalid image", photoid);
        alert("Invalid image " + photoid);
    };

})();
