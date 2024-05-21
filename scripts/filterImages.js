document.addEventListener("DOMContentLoaded", function () {
    function filterImages(filter) {
        document.querySelectorAll(".images").forEach(function (imagesContainer) {
            imagesContainer.style.display = "none";
        });

        document.querySelectorAll(".filter-options label").forEach(function (filterRadioContainer) {
            filterRadioContainer.style.transform = "scale(1)";
        });

        const filterImagesContainer = document.getElementById(filter + 'Images');
        if (filterImagesContainer) {
            filterImagesContainer.style.display = "flex";
        }

        const filterRadioContainer = document.getElementById(filter + 'Radio');
        if (filterRadioContainer) {
            filterRadioContainer.style.transform = "scale(1.2)";
        }
    }

    document.querySelectorAll('input[name="filter"]').forEach(function (radio) {
        radio.addEventListener("change", function () {
            console.log("Radio button changed to:", this.value);
            filterImages(this.value);
        });
    });

    const defaultFilter = document.querySelector('input[name="filter"]:checked');
    if (defaultFilter) {
        filterImages(defaultFilter.value);
    }
});