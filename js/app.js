(function () {

    var takephoto = document.getElementById("takephoto");

    takephoto.addEventListener("click", function () {
        var photoactivity = new MozActivity({
            name: "pick",
            data: {
                type: "image/jpeg"
            }
        });
    }, false);

})();
