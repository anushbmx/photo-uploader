(function () {

    var photoid = window.location.hash ? location.hash.replace(/^#/, "") : "",
        cardimg = document.getElementById("cardimg"),
        photo,
        photos;

    // Load photos from localforage using `localforage.getItem`.
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

    /**
     * Set the card image using `URL.createObjectURL`.
     */
    var printcard = function () {
        console.log("Printing card for photo", photo);
        cardimg.setAttribute("src", URL.createObjectURL(photo.blob));
    };

    /**
     * Show an error message if photo id is invalid.
     */
    var show404 = function () {
        console.log("404. Invalid image", photoid);
        alert("Invalid image " + photoid);
    };

    /**
     * Delete a photo from the Device Storage and from localforage.
     */
    var deletephoto = function () {

        // Confirm if user wants to delete
        if (confirm("Delete?")) {

            console.log("Deleting", photoid);

            // Use device storage to delete a photo.
            var photostorage = navigator.getDeviceStorage("pictures");
            var trydelete = photostorage.delete(photoid);

            trydelete.onsuccess = function () {
                console.log("unset", photos[photoid]);

                // If the file on device has been deleted, also update the localforage datastore.
                delete photos[photoid];

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
