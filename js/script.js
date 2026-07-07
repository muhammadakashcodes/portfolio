const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.remove("opacity-0");
        backToTop.classList.remove("translate-y-10");
        backToTop.classList.remove("invisible");

    }

    else {

        backToTop.classList.add("opacity-0");
        backToTop.classList.add("translate-y-10");
        backToTop.classList.add("invisible");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("opacity-100");

                    entry.target.classList.add("translate-y-0");

                }

            });

        },

        {

            threshold: .15

        }

    );

document.querySelectorAll("button,a").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.classList.add("scale-[1.02]");

    });

    btn.addEventListener("mouseleave", () => {

        btn.classList.remove("scale-[1.02]");

    });

});

document.querySelectorAll(".group").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.transform =

            `perspective(1000px) 
            rotateX(${-(y - rect.height / 2) / 30}deg) 
            rotateY(${(x - rect.width / 2) / 30}deg) 
            translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

const header =
    document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("shadow-2xl");

        header.classList.add("shadow-black/40");

    }

    else {

        header.classList.remove("shadow-2xl");

        header.classList.remove("shadow-black/40");

    }

});

const g = document.getElementById('glow');

if (window.matchMedia('(hover:hover)').matches) {

    document.addEventListener('mousemove', e => {

        g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px';

    });

}

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = mobileMenu.querySelectorAll("a");

    const openMenu = () => {
        mobileMenu.classList.add("max-h-64", "opacity-100");
        mobileMenu.classList.remove("max-h-0", "opacity-0");
        menuBtn.textContent = "✕";
    };

    const closeMenu = () => {
        mobileMenu.classList.remove("max-h-64", "opacity-100");
        mobileMenu.classList.add("max-h-0", "opacity-0");
        menuBtn.textContent = "☰";
    };

    menuBtn.addEventListener("click", () => {
        const isClosed = mobileMenu.classList.contains("max-h-0");
        if (isClosed) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            closeMenu();
        }
    });
});

document.querySelectorAll(".custom-select").forEach(select => {

    const button = select.querySelector(".select-btn");
    const menu = select.querySelector(".options");
    const arrow = select.querySelector(".arrow");
    const selected = select.querySelector(".selected-option");

    button.addEventListener("click", () => {

        // Close all other dropdowns
        document.querySelectorAll(".custom-select").forEach(other => {

            if (other !== select) {

                other.querySelector(".options").classList.remove(
                    "opacity-100",
                    "visible",
                    "scale-100"
                );

                other.querySelector(".options").classList.add(
                    "opacity-0",
                    "invisible",
                    "scale-95"
                );

                other.querySelector(".arrow").classList.remove("rotate-180");

            }

        });

        menu.classList.toggle("opacity-100");
        menu.classList.toggle("visible");
        menu.classList.toggle("scale-100");

        menu.classList.toggle("opacity-0");
        menu.classList.toggle("invisible");
        menu.classList.toggle("scale-95");

        arrow.classList.toggle("rotate-180");

    });

    select.querySelectorAll(".option").forEach(option => {

        option.addEventListener("click", () => {

            selected.textContent = option.textContent.trim();

            menu.classList.remove(
                "opacity-100",
                "visible",
                "scale-100"
            );

            menu.classList.add(
                "opacity-0",
                "invisible",
                "scale-95"
            );

            arrow.classList.remove("rotate-180");

        });

    });

});

document.addEventListener("click", e => {

    document.querySelectorAll(".custom-select").forEach(select => {

        if (!select.contains(e.target)) {

            select.querySelector(".options").classList.remove(
                "opacity-100",
                "visible",
                "scale-100"
            );

            select.querySelector(".options").classList.add(
                "opacity-0",
                "invisible",
                "scale-95"
            );

            select.querySelector(".arrow").classList.remove("rotate-180");

        }

    });

});