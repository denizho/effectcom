document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  const button3 = document.querySelector(".button3");
  const button3Image = button3.querySelector("img");
  const body = document.body;

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => button.classList.add("hover"));
    button.addEventListener("mouseleave", () => {
      button.classList.remove("hover");
      button.classList.remove("pressed");
    });

    const handlePress = (isPressed) => {
      if (isPressed) {
        button.classList.add("pressed");
      } else {
        button.classList.remove("pressed");
      }
    };

    button.addEventListener("mousedown", () => handlePress(true));
    button.addEventListener("mouseup", () => handlePress(false));
    button.addEventListener("touchstart", () => handlePress(true));
    button.addEventListener("touchend", () => handlePress(false));
  });

  button3.addEventListener("click", () => {
    body.classList.toggle("dark");

    document.querySelector(".main__buttons").classList.toggle("dark");
    document
      .querySelector(".main__projects__titleNight")
      .classList.toggle("dark");
    document.querySelector(".main__projects__nextel").classList.toggle("dark");
    document
      .querySelector(".main__projects__video__subtitle p")
      .classList.toggle("dark");
    document.querySelector("footer").classList.toggle("dark");

    const mainText = document.querySelector(".main__text");
    const mainButtonsText = document.querySelectorAll(".main__buttons__text");
    const mainButtonsSubtext = document.querySelectorAll(
      ".main__buttons__subtext"
    );

    if (body.classList.contains("dark")) {
      mainText.classList.add("dark");
      mainButtonsText.forEach((text) => text.classList.add("dark"));
      mainButtonsSubtext.forEach((subtext) => subtext.classList.add("dark"));

      button3Image.src = "images/header/header__button3dark.png";
      button3.classList.add("dark");

      const projectTitleImage = document.querySelector(
        ".main__projects__titleNight img"
      );
      const footerLogoImage = document.querySelector(".footer__logo img");

      if (body.classList.contains("dark")) {
        projectTitleImage.src = "images/main/main__projects__dark__arrow.png";
        footerLogoImage.src = "images/header/header__logo.png";
      }

      const buttonImages = document.querySelectorAll(
        ".main__buttons__text img"
      );
      buttonImages.forEach((img) => {
        img.src = img.src.replace(
          "main__buttons__play.png",
          "main__buttons__darkplay.png"
        );
      });
    } else {
      mainText.classList.remove("dark");
      mainButtonsText.forEach((text) => text.classList.remove("dark"));
      mainButtonsSubtext.forEach((subtext) => subtext.classList.remove("dark"));

      button3Image.src = "images/header/header__button3.png";
      button3.classList.remove("dark");

      const buttonImages = document.querySelectorAll(
        ".main__buttons__text img"
      );
      buttonImages.forEach((img) => {
        img.src = img.src.replace(
          "main__buttons__darkplay.png",
          "main__buttons__play.png"
        );
      });
    }
    const buttonsToChange = document.querySelectorAll(
      ".main__buttons__founded, .main__buttons__projects"
    );
    buttonsToChange.forEach((button) => {
      button.classList.toggle("dark");
    });
  });
});
