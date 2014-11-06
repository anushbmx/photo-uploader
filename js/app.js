(function () {

    var takephoto = document.getElementById("takephoto"),
        photogrid = document.getElementById("photogrid"),
        photos = [];

    // Load photos from localforage
    localforage.getItem("photos").then(function (result) {
        if (result) {
            photos = result;
        }
        console.log("Photos retrieved", photos);
        printphotos();
    });

    var printphotos = function () {
        console.log("printing photos", photos);
        photos.forEach(function (photo) {
            appendphoto(photo);
        });
    };

    var appendphoto = function (photo) {
        if (!document.querySelectorAll(".photo-item").length) {
            photogrid.innerHTML = "";
        }

        var photowrapper = document.createElement("div");
        console.log("appending", photo);
        photowrapper.setAttribute("class", "column item photo-item");
        photowrapper.setAttribute("data-name", photo.blob.name);
        photowrapper.setAttribute("data-size", photo.blob.size);
        photowrapper.setAttribute("data-type", photo.blob.type);
        photowrapper.setAttribute("data-lastModifiedDate", photo.blob.lastModifiedDate);
        photowrapper.innerHTML = "<img src='" + URL.createObjectURL(photo.blob) + "'>";
        photowrapper.addEventListener("click", function () {
            alert("going to card view of " + this.getAttribute("data-name"));
            window.location.replace("card.html#photo=" + this.getAttribute("data-name"));
        }, false);
        photogrid.appendChild(photowrapper);
    };

    var savephoto = function (photo) {
        photos.push(photo);
        localforage.setItem("photos", photos, function () {
            console.log("setting photos storage", photos, photos.length);
            alert("Photo saved.");
            appendphoto(photo);
        });
    };

    // Trigger a "pick" Web Activity when "Take a Photo" button is clicked
    takephoto.addEventListener("click", function () {
        var photoactivity = new MozActivity({
            name: "pick",
            data: {
                type: "image/jpeg"
            }
        });

        // Handle the activity's success event
        photoactivity.onsuccess = function () {
            var photo = this.result;
            console.log("Got photo", photo);
            savephoto(photo);
        };

        // Handle the activity's error event
        photoactivity.onerror = function () {
            console.log("error", this.error);
        };

    }, false);

})();
