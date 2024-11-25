document.addEventListener("DOMContentLoaded", () => {
  const notificationsButtons = document.querySelectorAll(
    ".notifications-button"
  );
  const notificationsContents = document.querySelectorAll(
    ".notifications-content"
  );

  notificationsButtons.forEach((notificationsButton, index) => {
    const notificationsContent = notificationsContents[index];

    notificationsButton.addEventListener("click", (event) => {
      event.stopPropagation();

      notificationsContent.classList.toggle("open");
    });
  });

  // Fechar notificações se clicar fora
  document.addEventListener("click", (event) => {
    notificationsContents.forEach((notificationsContent) => {
      if (
        !notificationsContent.contains(event.target) &&
        !event.target.closest(".notifications-button")
      ) {
        notificationsContent.classList.remove("open"); 
      }
    });
  });
});



function handleClick(page) {
  window.location.href = page;
}
