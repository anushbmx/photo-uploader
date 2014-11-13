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

    /**
     * Upload a photo to Imgur.
     */
    var uploadphoto = function() {
      // Get file object
      var file = photo.blob;

      // Create object for form data
      var fd = new FormData();

      // Add file to form data
      fd.append("image", file);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/upload.json");
      xhr.onload = function() {
        var data = JSON.parse(xhr.responseText).data;
        var imgurURL = data.link;
        photos[photoid].imgurURL = imgurURL;
        localforage.setItem("photos", photos, function () {});
      }
      var clientId = 'Client-ID 1ca3a1cf63cc8bc';
      xhr.setRequestHeader('Authorization', clientId);
      xhr.send(fd);
    };

    /**
     * Share a photo.
     */
    var sharephoto = function() {
      var blob = photos[id].blob;
      new MozActivity({
        name: "share",
        data: {
          type: photos[id].type,
          number: 1,
          blobs: [blob]
        }
      });
    }

    // Button bindings
    document.querySelector("#deletebutton").addEventListener("click", deletephoto, false);
    document.querySelector("#sharebutton").addEventListener("click", sharephoto, false);
    document.querySelector("#uploadbutton").addEventListener("click", uploadphoto, false);

})();
