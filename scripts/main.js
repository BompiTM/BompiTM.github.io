document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 'index';
    loadPage(page).then(() => console.log('Page loaded:', page));
    window.addEventListener('popstate', function() {
        const path = window.location.pathname.split('/').pop();
        loadPage(path || 'index').then(() => console.log('Page loaded:', path));
    });
});

async function loadPage(pageName) {
    if (pageName === 'index') {
        document.getElementById('main').innerHTML = '<div class="big-text">Coming soon™</div>';
        return;
    }
    try {
        const response = await fetch(`../pages/${pageName}.html`);
        document.getElementById('main').innerHTML = await response.text();
        initializeScripts();
    } catch (error) {
        document.getElementById('main').innerHTML = '<div class="big-text">Page not found</div>';
    }
}

function navigate(event, pageName) {
    event.preventDefault();
    history.pushState(null, '', `/${pageName}`);
    loadPage(pageName).then(() => console.log('Page loaded:', pageName));
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
