document.addEventListener("DOMContentLoaded", () => {

    /* ---------- SPA ROUTES ---------- */

    const routes = {
        "/": {
            title: "TravelVista | Home",
            label: "Home"
        },

        "/destinations": {
            title: "TravelVista | Destinations",
            label: "Destinations"
        },

        "/packages": {
            title: "TravelVista | Packages",
            label: "Packages"
        },

        "/about": {
            title: "TravelVista | About",
            label: "About"
        },

        "/contact": {
            title: "TravelVista | Contact",
            label: "Contact"
        }
    };


    /* ---------- ELEMENTS ---------- */

    const views = document.querySelectorAll("[data-spa-view]");
    const routeStatus = document.querySelector("#route-status");

    const navLinks = document.querySelectorAll(
        '.nav nav a[href^="#/"]'
    );


    /* ---------- ROUTE HELPERS ---------- */

    function normalizeRoute(route) {

        if (!route) {
            return "/";
        }

        if (route.length > 1) {
            route = route.replace(/\/+$/, "");
        }

        return route || "/";
    }


    function getCurrentRoute() {

        const hash = window.location.hash;

        if (!hash || hash === "#") {
            return "/";
        }

        if (hash.startsWith("#/")) {
            return normalizeRoute(hash.substring(1));
        }

        return "/";
    }


    /* ---------- RENDER ROUTE ---------- */

    function renderRoute(route, announceError = false) {

        route = normalizeRoute(route);

        let routeExists = routes[route];

        if (!routeExists) {

            route = "/";

            history.replaceState(
                {},
                "",
                "#/"
            );

            announceError = true;
        }


        /* Show / hide SPA views */

        views.forEach((view) => {

            const viewRoute = view.dataset.spaView;

            const shouldShow = viewRoute === route;

            view.hidden = !shouldShow;

            view.classList.toggle(
                "spa-view-active",
                shouldShow
            );

        });


        /* Update page title */

        document.title = routes[route].title;


        /* Update active navigation */

        navLinks.forEach((link) => {

            const linkRoute = normalizeRoute(
                link.getAttribute("href").substring(1)
            );

            const isActive = linkRoute === route;

            link.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        });


        /* Accessible route announcement */

        if (routeStatus) {

            if (announceError) {

                routeStatus.textContent =
                    "Page not found. Showing the TravelVista Home page.";

            } else {

                routeStatus.textContent =
                    `${routes[route].label} page loaded.`;

            }

        }


        /* Move viewport to top */

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });

    }


    /* ---------- NAVIGATE WITHOUT PAGE RELOAD ---------- */

    function navigate(route) {

        route = normalizeRoute(route);

        history.pushState(
            {},
            "",
            `#${route}`
        );

        renderRoute(route);

    }


    /* ---------- SPA LINK HANDLING ---------- */

    document.addEventListener("click", (event) => {

        const link = event.target.closest(
            'a[href^="#/"]'
        );

        if (!link) {
            return;
        }


        /* Allow Ctrl / Cmd / Shift / Alt clicks */

        if (
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
        ) {
            return;
        }


        event.preventDefault();

        const route = link
            .getAttribute("href")
            .substring(1);

        navigate(route);

    });


    /* ---------- BROWSER BACK / FORWARD ---------- */

    window.addEventListener(
        "popstate",
        () => {
            renderRoute(getCurrentRoute());
        }
    );


    /* ---------- HASH CHANGES ---------- */

    window.addEventListener(
        "hashchange",
        () => {
            renderRoute(getCurrentRoute());
        }
    );


    /* =========================================
       NEWSLETTER FORM
       ========================================= */

    const newsletterForm = document.querySelector(
        ".footer form"
    );

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const emailInput =
                    newsletterForm.querySelector("input");

                const email =
                    emailInput.value.trim();

                let message =
                    newsletterForm.querySelector(
                        ".form-message"
                    );


                /* Create message element */

                if (!message) {

                    message =
                        document.createElement("p");

                    message.className =
                        "form-message";

                    message.setAttribute(
                        "role",
                        "status"
                    );

                    message.setAttribute(
                        "aria-live",
                        "polite"
                    );

                    newsletterForm.appendChild(
                        message
                    );

                }


                /* Empty email */

                if (email === "") {

                    message.textContent =
                        "Please enter your email address.";

                    message.style.color =
                        "#ffb4b4";

                    return;
                }


                /* Basic email validation */

                if (
                    !email.includes("@") ||
                    !email.includes(".")
                ) {

                    message.textContent =
                        "Please enter a valid email address.";

                    message.style.color =
                        "#ffb4b4";

                    return;
                }


                /* Successful subscription */

                message.textContent =
                    "Thank you! You have been subscribed successfully.";

                message.style.color =
                    "#9be7b0";

                emailInput.value = "";

            }
        );

    }


    /* =========================================
       PACKAGE DETAILS
       ========================================= */

    const detailButtons =
        document.querySelectorAll(
            ".package .small"
        );


    detailButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const packageCard =
                    button.closest(".package");

                if (!packageCard) {
                    return;
                }

                const packageName =
                    packageCard
                        .querySelector("h3")
                        .textContent
                        .trim();

                alert(
                    `${packageName}\n\n` +
                    "This package includes a curated travel experience. " +
                    "More details will be available soon!"
                );

            }
        );

    });


    /* ---------- INITIAL ROUTE ---------- */

    renderRoute(getCurrentRoute());

});