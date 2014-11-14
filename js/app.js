//##(function () {

//##   var takephoto = document.getElementById("takephoto"),
//##       photogrid = document.getElementById("photogrid"),

        // Create a blank object to store our photos data
//##       photos = {};

    // Load photos from localforage using `localforage.getItem`.
//##    localforage.getItem("photos").then(function (result) {

        // Check if any photo exist. If no prior data is present, `result` will be `null`.
//##        if (result) {
            // If any data is found, store if in the `photos` object
//##            photos = result;
//##        }
//##        console.log("Photos retrieved", photos);

        // Trigger the function to inject photos in the DOM
//##        printphotos();
//##    });

    /**
     * Inject list of photos to the DOM.
     *
     * This function iterates over the `photos` object and calls `appendphoto()` for each item.
     */
//##    var printphotos = function () {
//##        console.log("printing photos", photos);
//##        for (var key in photos) {
//##            appendphoto(photos[key]);
//##        }
//##    };

    /**
     * Append individual photo elements to the photo grid.
     */
//##    var appendphoto = function (photo) {
//##        if (!document.querySelectorAll(".photo-item").length) {
//##            photogrid.innerHTML = "";
//##        }

//##        var photowrapper = document.createElement("div");
//##        console.log("appending", photo);
//##        photowrapper.setAttribute("class", "column item photo-item");

        // We store necessary information about the current photo item
        // as `data` attributes on its corresponding DOM element. This
        // removes the requirement to store the entire `photos` object
        // in the memory. We can get information about a specific
        // photo by doing `Element.getAttribute()`.
//##        photowrapper.setAttribute("data-name", photo.blob.name);
//##        photowrapper.setAttribute("data-size", photo.blob.size);
//##        photowrapper.setAttribute("data-type", photo.blob.type);
//##        photowrapper.setAttribute("data-lastModifiedDate", photo.blob.lastModifiedDate);

        // We use `URL.createObjectURL()` to generate a temporary reference to our photo blob.
//##        photowrapper.innerHTML = "<img src='" + URL.createObjectURL(photo.blob) + "'>";

        // For each photo item, we do a click binding to go to the card page for that photo.
//##        photowrapper.addEventListener("click", function () {
            // We send the photo's `File.name` property as the hash fragment
//##            window.location.replace("card.html#" + this.getAttribute("data-name"));
//##        }, false);

//##        photogrid.appendChild(photowrapper);
//##    };

    /**
     * Save a photo to our local data store using localforage.
     *
     * This function shows the usage of `localforage.setItem`.
     */
 
//##    var savephoto = function (photo) {
//##        photos[photo.blob.name] = photo;

//##        localforage.setItem("photos", photos, function () {
//##            console.log("setting photos storage", photos);
//##            alert("Photo saved.");
//##            appendphoto(photo);
//##        });
//##    };

    // Trigger a "pick" Web Activity when "Take a Photo" button is clicked
//##    takephoto.addEventListener("click", function () {
//##        var photoactivity = new MozActivity({
//##            name: "pick",
//##            data: {
//##                type: "image/jpeg"
//##            }
//##        });

        // Handle the activity's success event
//##        photoactivity.onsuccess = function () {
//##            var photo = this.result;
//##            console.log("Got photo", photo);
//##            savephoto(photo);
//##        };

        // Handle the activity's error event
//##        photoactivity.onerror = function () {
//##            console.log("error", this.error);
//##        };

//##    }, false);

//##})();
