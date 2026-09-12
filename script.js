/* =========================================
   TRAVELVISTA — WEEK 3
   JavaScript Interactivity
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- 1. EXPLORE DESTINATIONS ---------- */

    const exploreButton = document.querySelector(
        'a[href="#destinations"]'
    );

    const destinationsSection = document.querySelector("#destinations");

    if (exploreButton && destinationsSection) {

        exploreButton.addEventListener("click", (event) => {

            event.preventDefault();

            destinationsSection.scrollIntoView({
                behavior: "smooth"
            });

        });

    }


    /* ---------- 2. NEWSLETTER FORM ---------- */

    const newsletterForm = document.querySelector(".footer form");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const emailInput = newsletterForm.querySelector("input");
            const email = emailInput.value.trim();

            let message = newsletterForm.querySelector(".form-message");

            if (!message) {

                message = document.createElement("p");

                message.className = "form-message";

                newsletterForm.appendChild(message);

            }


            /* Empty email */

            if (email === "") {

                message.textContent =
                    "Please enter your email address.";

                message.style.color = "#ffb4b4";

                return;

            }


            /* Invalid email */

            if (!email.includes("@") || !email.includes(".")) {

                message.textContent =
                    "Please enter a valid email address.";

                message.style.color = "#ffb4b4";

                return;

            }


            /* Valid email */

            message.textContent =
                "Thank you! You have been subscribed successfully.";

            message.style.color = "#9be7b0";

            emailInput.value = "";

        });

    }


    /* ---------- 3. PACKAGE DETAILS ---------- */

    const detailButtons = document.querySelectorAll(
        ".package .small"
    );

    detailButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            const packageCard = button.closest(".package");

            const packageName =
                packageCard.querySelector("h3").textContent.trim();

            alert(
                `${packageName}\n\n` +
                "This package includes a curated travel experience. " +
                "More details will be available soon!"
            );

        });

    });

});