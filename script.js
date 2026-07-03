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

document.getElementById('menuBtn').onclick = () => document.getElementById('mobileMenu').classList.toggle('hidden');
