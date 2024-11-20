document.addEventListener('DOMContentLoaded', () => {
    const notificationsButton = document.querySelector('.notifications-button');
    const notificationsContent = document.querySelector('.notifications-content');

    notificationsButton.addEventListener('click', (event) => {
        event.stopPropagation();
        notificationsContent.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        if (!notificationsContent.contains(event.target) && !notificationsButton.contains(event.target)) {
            notificationsContent.classList.remove('open');
        }
    });

    window.addEventListener('scroll', () => {
        if (!notificationsContent.matches(':hover')) {
            notificationsContent.classList.remove('open');
        }
    });
});