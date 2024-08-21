function revealToSpan() {
    let elements = document.querySelectorAll(".reveal");

    elements.forEach(function (element) {
        let parentSpan = document.createElement("span");
        let childSpan = document.createElement("span");

        parentSpan.classList.add("parent");
        childSpan.classList.add("child");

        childSpan.innerHTML = element.innerHTML;
        parentSpan.appendChild(childSpan);

        element.innerHTML = "";
        element.appendChild(parentSpan);
    });
}

function valueSetters() {
    gsap.set("nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home .parent .child", { y: "100%" });
    gsap.set("#home .row img", { opacity: 0 });

    document.querySelectorAll("#Visual>g").forEach(function (e) {
        var character = e.childNodes[1].childNodes[1];

        character.style.strokeDasharray = character.getTotalLength() + 'px';
        character.style.strokeDashoffset = character.getTotalLength() + 'px';
    });
}

function loaderAnimation() {
    let tl = gsap.timeline();

    tl
        .from("#loader .child span", {
            x: 100,
            duration: 1.4,
            stagger: 0.2,
            ease: Power3.easeInOut
        })
        .to("#loader .parent .child", {
            y: "-100%",
            duration: 1,
            delay: 0.5,
            ease: Circ.easeInOut
        })
        .to("#loader #loading", {
            opacity: 0,
            delay: -1
        })
        .to("#loader", {
            height: 0,
            duration: 0.8,
            ease: Circ.easeInOut
        })
        .to("#green", {
            height: "100%",
            duration: 0.5,
            delay: -0.6,
            ease: Circ.easeOut
        })
        .to("#green", {
            height: "0%",
            top: 0,
            duration: 0.8,
            ease: Circ.easeOut,
            onComplete: function () {
                animateHomePage();
            }
        });
}

function animateSvg() {
    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
        strokeDashoffset: 0,
        duration: 3.5,
        ease: Circ.easeInOut,
    });
}

function animateHomePage() {
    let tl = gsap.timeline();

    tl
        .to("nav a", {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.05,
            ease: Expo.easeInOut
        })
        .to("#home .parent .child", {
            y: 0,
            stagger: 0.1,
            duration: 1.5,
            ease: Expo.easeInOut
        })
        .to("#home .row img", {
            opacity: 1,
            ease: Expo.easeInOut,
            onComplete: function () {
                animateSvg();
            }
        });
}

function cardHoverEffect() {
    document.querySelectorAll(".cnt")
        .forEach(function (cnt) {
            let showingImg;
            let projectImg;

            cnt.addEventListener("mousemove", function (dets) {
                document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
                showingImg = dets.target;
                document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
                showingImg.style.filter = "grayscale(1)";

                document.querySelector("#project").style.backgroundColor = "#" + dets.target.dataset.color;

                // Target the image inside the .projectLinksArrowBtn of the current .cnt
                projectImg = cnt.querySelector(".projectLinksArrowBtn img");

                if (projectImg) {
                    projectImg.style.transform = "translate(8px , 0px) rotate(50deg)";
                }

            })
            cnt.addEventListener("mouseleave", function (dets) {
                document.querySelector("#cursor").children[showingImg.dataset.index].style.opacity = 0;
                showingImg.style.filter = "grayscale(0)";
                document.querySelector("#project").style.backgroundColor = "#f2f2f2";

                if (projectImg) {
                    projectImg.style.transform = "translate(8px , 0px) rotate(90deg)";
                }
            })
        })
}

function closeAndOpenCreditSection() {

    document.querySelector("#credits").addEventListener("click", () => {
        document.querySelector("#creditsSection").style.visibility = "visible";
        document.querySelector("#creditsSection").style.height = "30%";
    })

    document.querySelector("#creditsSection #closeBtn").addEventListener("click", () => {
        document.querySelector("#creditsSection").style.visibility = "hidden";
        document.querySelector("#creditsSection").style.height = "0%";
    })
}

revealToSpan();
valueSetters();
loaderAnimation();
cardHoverEffect();
closeAndOpenCreditSection();