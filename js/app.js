(function () {


    // Create a blank object to store our photos data

    // Load photos from localforage using `localforage.getItem`.

    // Check if any photo exist. If no prior data is present, `result` will be `null`.

    // If any data is found, store if in the `photos` object

    // Trigger the function to inject photos in the DOM


    /**
     * Inject list of photos to the DOM.
     *
     * This function iterates over the `photos` object and calls `appendphoto()` for each item.
     */

    /**
     * Append individual photo elements to the photo grid.
     */


    // We store necessary information about the current photo item
    // as `data` attributes on its corresponding DOM element. This
    // removes the requirement to store the entire `photos` object
    // in the memory. We can get information about a specific
    // photo by doing `Element.getAttribute()`.


    // We use `URL.createObjectURL()` to generate a temporary reference to our photo blob.

    // For each photo item, we do a click binding to go to the card page for that photo.

    // We send the photo's `File.name` property as the hash fragment

    /**
     * Save a photo to our local data store using localforage.
     *
     * This function shows the usage of `localforage.setItem`.
     */
 

    // Trigger a "pick" Web Activity when "Take a Photo" button is clicked

    // Handle the activity's success event

    // Handle the activity's error event

})();
