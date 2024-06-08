async function loadPage(pageName) {
    if (pageName === 'index') {
        document.getElementById('main').innerHTML = '<div class="big-text">Coming soon™</div>';
        return;
    }
    const response = await fetch(`../pages/${pageName}.html`);
    document.getElementById('main').innerHTML = await response.text();
    initializeScripts();
}

function initializeScripts() {
    const clickableImages = document.querySelectorAll('.clickable-image');
    clickableImages.forEach(function (image) {
        image.addEventListener('click', function () {
            const desiredUrl = image.getAttribute('data-url');
            navigator.clipboard.writeText(desiredUrl).then(function () {
                console.log('URL successfully copied: ' + desiredUrl);
                const notification = document.getElementById('copyNotification');
                notification.style.opacity = '1';
                setTimeout(function () {
                    notification.style.opacity = '0';
                }, 3000);
            }).catch(function (err) {
                console.error('Error copying URL: ', err);
            });
        });
    });

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
}

document.addEventListener('DOMContentLoaded', function () {
    initializeScripts();
});