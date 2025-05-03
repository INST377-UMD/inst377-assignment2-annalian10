window.onload = async () => {
    const quoteEl = document.getElementById("quote");
    try {
        const res = await fetch("https://zenquotes.io/api/quotes/");
        const data = await res.json();
        quoteEl.textContent = `"${data[0].q}" - ${data[0].a}`;
     } catch (e) {
        quoteEl.textContent = "Failed to load quote.";
     }
};

if (annyang) {
    const commands = {
        "hello": () => alert("Hello World"),
        "change the color to *color": (color) => document.body.style.backgroundColor = color,
        "navigate to *page": (page) => window.location.href = page.toLowerCase() + ".html"
    };
    annyang.addCommands(commands);
}