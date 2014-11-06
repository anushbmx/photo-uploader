(function () {

    var photoid = window.location.hash ? location.hash.replace(/^#/, "") : "",
        cardimg = document.getElementById("cardimg"),
        photo,
        photos;

    // Load photos from localforage
    localforage.getItem("photos").then(function (result) {
        if (result) {
            photos = result;
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

    var deletephoto = function () {

        if (confirm("Delete?")) {
            console.log("Deleting", photoid);
            var photostorage = navigator.getDeviceStorage("pictures");
            var trydelete = photostorage.delete(photoid);

            trydelete.onsuccess = function () {
                console.log("unset", photos[photoid]);
                delete(photos[photoid]);

                localforage.setItem("photos", photos, function () {
                    alert("Photo deleted");
                    window.location.replace("index.html");
                });
            };

            trydelete.onerror = function () {
                alert("Unable to delete photo");
            };
        }
    };

    // Button bindings
    document.getElementById("deletebutton").addEventListener("click", deletephoto, false);

})();
