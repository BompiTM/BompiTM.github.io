document.addEventListener('DOMContentLoaded', function () {
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
});