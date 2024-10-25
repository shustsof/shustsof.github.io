document.addEventListener("DOMContentLoaded", function() {
  const initialView = document.getElementById("initial-view");
  const body = document.body;

  // Event listener to transition from initial view to main content
  initialView.addEventListener("click", function() {
    body.classList.remove("initial-loading");
    body.classList.add("loaded");
  });

  // Get buttons and content sections for navigation
  const sketchesButton = document.getElementById("sketch-button");
  const comicsButton = document.getElementById("comics-button");
  const illustraceButton = document.getElementById("illustrace-button");
  const animationsButton = document.getElementById("animace-button");
  const traditionalButton = document.getElementById("traditional-button");
  const aboutButton = document.getElementById("about-button");
const digitalButton = document.getElementById("digital-button");
const pencilButton = document.getElementById("pencil-button");
const penButton = document.getElementById("pen-button");
const inkButton = document.getElementById("ink-button");

  const sketchesContent = document.getElementById("sketches-content");
  const comicsContent = document.getElementById("comics-content");
  const illustraceContent = document.getElementById("illustrace-content");
  const animationsContent = document.getElementById("animations-content");
  const traditionalContent = document.getElementById("traditional-content");
  const digitalContent = document.getElementById("digital-content");
  const pencilContent = document.getElementById("pencil-content");
  const penContent = document.getElementById("pen-content");
  const inkContent = document.getElementById("ink-content");


  const aboutContent = document.getElementById("about-content");
  const moreInfoSection = document.getElementById("more-info");

  const tellMeMoreBtn = document.getElementById("tell-me-more-btn");

  // Event listeners for navigation buttons to toggle content visibility
  animationsButton.addEventListener("click", function () {
    toggleContent(animationsContent);
    hideContent([sketchesContent,comicsContent,illustraceContent,traditionalContent,aboutContent,moreInfoSection]);
  });

  digitalButton.addEventListener("click", function () {
    toggleContent(digitalContent);
    hideContent([pencilContent,penContent,inkContent,animationsContent,comicsContent,illustraceContent,traditionalContent,aboutContent,moreInfoSection]);
  });pencilButton.addEventListener("click", function () {
    toggleContent(pencilContent);
    hideContent([digitalContent,penContent,inkContent,animationsContent,comicsContent,illustraceContent,traditionalContent,aboutContent,moreInfoSection]);
  });penButton.addEventListener("click", function () {
    toggleContent(penContent);
    hideContent([pencilContent,digitalButton,inkContent,animationsContent,comicsContent,illustraceContent,traditionalContent,aboutContent,moreInfoSection]);
  });inkButton.addEventListener("click", function () {
    toggleContent(inkContent);
    hideContent([pencilContent,digitalButton,penContent,animationsContent,comicsContent,illustraceContent,traditionalContent,aboutContent,moreInfoSection]);
  });

  comicsButton.addEventListener("click", function () {
    toggleContent(comicsContent);
    hideContent([animationsContent,sketchesContent,illustraceContent,traditionalContent,aboutContent,moreInfoSection]);
  });

  illustraceButton.addEventListener("click", function () {
    toggleContent(illustraceContent);
    hideContent([animationsContent,sketchesContent,comicsContent,traditionalContent,aboutContent,moreInfoSection]);
  });

  traditionalButton.addEventListener("click", function () {
    toggleContent(traditionalContent);
    hideContent([animationsContent,sketchesContent,comicsContent,illustraceContent,aboutContent,moreInfoSection]);
  });

  aboutButton.addEventListener("click", function () {
    toggleContent(aboutContent);
    hideContent([sketchesContent, animationsContent, artsContent]);
  });

  tellMeMoreBtn.addEventListener("click", function() {
    moreInfoSection.classList.add("active");
    moreInfoSection.style.display = "block"; // Устанавливаем display в block для отображения секции
    $('html, body').animate({
      scrollTop: $(moreInfoSection).offset().top
    }, 1000); // Длительность анимации в миллисекундах
  });

  // Function to toggle content section visibility
  function toggleContent(content) {
    if (content.classList.contains("active")) {
      content.classList.remove("active");
      content.style.height = "0";
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 0;
      });
    } else {
      content.classList.add("active");
      content.style.height = content.scrollHeight + "px";
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 1;
      });
    }
  }

  // Function to hide content sections
  function hideContent(contents) {
    contents.forEach(content => {
      content.classList.remove("active");
      content.style.height = "0";
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 0;
      });
    });
  }

  // Language switching functionality
  const languages = [
    { code: "cs", text: "Portfolio\nSofia Šustová" }, // Czech
    { code: "ru", text: "Портфолио\nСофия Шустова" }, // Russian
    { code: "es", text: "포트폴리오\n소피아 슈스토바" }, // Korean
    { code: "fa", text: "نمونه کارها\nصوفیا شوستوا" }, // Persian
    { code: "en", text: "Portfolio\nSofiia Shustova" }, // English
    { code: "ja", text: "ポートフォリオ\nショフィアシュストワ" }, // Japanese
    { code: "de", text: "Portfolio\nSofia Schustowa" }, // German
    { code: "zh", text: "投资组合\n索菲亚舒斯托娃" } // Chinese
  ];

  const header = document.getElementById("portfolio-header");
  const author = document.getElementById("author");
  const header_init = document.getElementById("portfolio-header_init");
  const author_init = document.getElementById("author_init");

  let currentLanguageIndex = 0;

  // Function to change the language text
  function changeLanguage() {
    header.classList.remove("fade-in");
    author.classList.remove("fade-in");
    header_init.classList.remove("fade-in");
    author_init.classList.remove("fade-in");
    setTimeout(() => {
      currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
      const { text } = languages[currentLanguageIndex];
      const [portfolioText, authorText] = text.split("\n");
      header.textContent = portfolioText;
      author.textContent = authorText;
      header.classList.add("fade-in");
      author.classList.add("fade-in");

      header_init.textContent = portfolioText;
      author_init.textContent = authorText;
      header_init.classList.add("fade-in");
      author_init.classList.add("fade-in");

      // Ensure elements are visible after changing text
      header.style.opacity = 1;
      author.style.opacity = 1;
      header_init.style.opacity = 1;
      author_init.style.opacity = 1;
    }, 500);
  }

  // Change language every 3 seconds
  setInterval(changeLanguage, 3000);
});



$(document).ready(function() {
  // Page initialization and loading images from JSON
  init();

  // Function to open the image modal
  function openImageModal(imgSrc, captionText) {
    $('#image-modal-img').attr('src', imgSrc);
    $('#image-modal-caption').text(captionText);
    $('#image-modal').css('display', 'block');
    $('#image-modal .image-modal-content').css('animation', 'scaleUp 0.3s ease-in-out');
  }

  // Function to close the image modal
  function closeImageModal() {
    $('#image-modal').css('animation', 'fadeOut 0.5s ease-in-out');
    $('#image-modal').on('animationend', function() {
      $('#image-modal').css('display', 'none');
      $('#image-modal').css('animation', ''); // Reset animation
      $('#image-modal').off('animationend'); // Remove event handler
    });
  }

  // Event handler for image click to open modal
  $('body').on('click', '.card a', function(event) {
    if ($(this).closest('.instagram-button').length > 0) {
      // If click was on the Instagram button, do not open the modal
      return;
    }
    event.preventDefault();
    var imgSrc = $(this).attr('href');
    var captionText = $(this).next('p').text();
    openImageModal(imgSrc, captionText);
  });

  // Event handler for close button click to close modal
  $('.image-modal-close').click(function() {
    closeImageModal();
  });

  // Event handler for clicking outside modal content to close modal
  $('#image-modal').click(function(event) {
    if ($(event.target).is('#image-modal')) {
      closeImageModal();
    }
  });

  // Event handler for the "MORE" button
  $('#tell-me-more-btn').click(function() {
    $('#more-info').fadeIn();
    $('html, body').animate({
      scrollTop: $('#more-info').offset().top
    }, 1000); // Animation duration in milliseconds
  });
});

function init() {
  $.getJSON("images.json", imagesOut);
}

function imagesOut(data) {
  var sketchesOut = '';
  var artsOut = '';
  var animationsOut = '';

  for (var key in data) {
    var item = data[key];
    var card = '<div class="card">';

    if (item.category === 'sketch') {
      card += `<a href="${item.img}"><img src="${item.img}" alt="${item.description}"></a>`;
      card += `<p>${item.description}</p>`;
      card += `<button class="instagram-button">`;
      card += `<a href="${item.insta}" target="_blank"><img src="img/INSTA.png" alt="Instagram"></a>`;
      card += `</button>`;
      card += `</div>`;
      sketchesOut += card;
    } else if (item.category === 'animations') {
      card += `<video src="${item.img}" alt="${item.description}" controls></video>`;
      card += `<p>${item.description}</p>`;
      card += `<button class="instagram-button">`;
      card += `<a href="${item.insta}" target="_blank"><img src="img/INSTA.png" alt="Instagram"></a>`;
      card += `</button>`;
      card += `</div>`;
      animationsOut += card;
    } else if (item.category === 'art') {
      card += `<a href="${item.img}"><img src="${item.img}" alt="${item.description}"></a>`;
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
