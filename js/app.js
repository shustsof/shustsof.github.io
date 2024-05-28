document.addEventListener("DOMContentLoaded", function() {
  const sketchesButton = document.getElementById("sketches-button");
  const artsButton = document.getElementById("arts-button");
  const animationsButton = document.getElementById("animations-button");
  const aboutButton = document.getElementById("about-button");

  const sketchesContent = document.getElementById("sketches-content");
  const artsContent = document.getElementById("arts-content");
  const animationsContent = document.getElementById("animations-content");
  const aboutContent = document.getElementById("about-content");

  sketchesButton.addEventListener("click", function () {
    toggleContent(sketchesContent);
    hideContent([animationsContent, artsContent, aboutContent]);
  });

  artsButton.addEventListener("click", function () {
    toggleContent(artsContent);
    hideContent([sketchesContent, animationsContent, aboutContent]);
  });

  animationsButton.addEventListener("click", function () {
    toggleContent(animationsContent);
    hideContent([sketchesContent, artsContent, aboutContent]);
  });

  aboutButton.addEventListener("click", function () {
    toggleContent(aboutContent);
    hideContent([sketchesContent, animationsContent, artsContent]);
  });

  function toggleContent(content) {
    content.classList.toggle("active");
    if (content.classList.contains("active")) {
      content.style.height = content.scrollHeight + "px";
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 1;
      });
    } else {
      content.style.height = "0";
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 0;
      });
    }
  }

  function hideContent(contents) {
    contents.forEach(content => {
      content.classList.remove("active");
      content.style.height = "0";
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 0;
      });
    });
  }

  const languages = [
    {code: "cs", text: "Portfolio\nSofia Šustová"},
    {code: "ru", text: "Портфолио\nСофия Шустова"},
    {code: "es", text: "포트폴리오\n소피아 슈스토바"},
    {code: "fa", text: "نمونه کارها\nصوفیا شوستوا"},
    {code: "en", text: "Portfolio\nSofiia Shustova"},
    {code: "ja", text: "ポートフォリオ\nショフィアシュストワ"},
    {code: "de", text: "Portfolio\nSofia Schustowa"},
    {code: "zh", text: "投资组合\n索菲亚舒斯托娃"}
  ];

  const header = document.getElementById("portfolio-header");
  const author = document.getElementById("author");

  let currentLanguageIndex = 0;

  function changeLanguage() {
    header.classList.remove("fade-in");
    author.classList.remove("fade-in");
    setTimeout(() => {
      currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
      const {text} = languages[currentLanguageIndex];
      const [portfolioText, authorText] = text.split("\n");
      header.textContent = portfolioText;
      author.textContent = authorText;
      header.classList.add("fade-in");
      author.classList.add("fade-in");
    }, 500);
  }

  setInterval(changeLanguage, 3000);
});












function init() {
  $.getJSON("images.json", imagesOut);
}

function imagesOut(data) {
  console.log(data);
  var sketchesOut = '';
  var artsOut = '';
  var animationsOut = '';

  for (var key in data) {
    var item = data[key];
    var card = '<div class="card">';

    if (item.category === 'sketch') {
      card += `<img src="${item.img}" alt="${item.description}">`;
      card += `<p>${item.description}</p>`;
      card += `<button class="instagram-button">`;
      card += `<a href="${item.insta}" target="_blank"><img src="img/INSTA.png" alt="Instagram"></a>`;
      card += `</button>`;
      card += `</div>`;
      sketchesOut += card;
    } else if (item.category === 'animation') {
      card += `<video src="${item.img}" alt="${item.description}" controls></video>`;
      card += `<p>${item.description}</p>`;
      card += `<button class="instagram-button">`;
      card += `<a href="${item.insta}" target="_blank"><img src="img/INSTA.png" alt="Instagram"></a>`;
      card += `</button>`;
      card += `</div>`;
      animationsOut += card;
    } else if (item.category === 'art') {
      card += `<img src="${item.img}" alt="${item.description}">`;
      card += `<p>${item.description}</p>`;
      card += `<button class="instagram-button">`;
      card += `<a href="${item.insta}" target="_blank"><img src="img/INSTA.png" alt="Instagram"></a>`;
      card += `</button>`;
      card += `</div>`;
      artsOut += card;
    }
  }

  $('#sketches-content').html(sketchesOut);
  $('#arts-content').html(artsOut);
  $('#animations-content').html(animationsOut);
}


$(document).ready(function() {
  init();
});
