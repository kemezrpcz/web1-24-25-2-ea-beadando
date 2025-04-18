function adjustFooter() {
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");
    
    if (document.body.scrollHeight > window.innerHeight) {
        footer.style.position = "relative"
        footer.style.top = "auto";
    } else {
        footer.style.position = "absolute";
        footer.style.top = "100%";
    }
}

window.addEventListener("load", adjustFooter);
window.addEventListener("resize", adjustFooter);