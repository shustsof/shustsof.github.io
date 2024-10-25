document.addEventListener("DOMContentLoaded", function() {
  const initialView = document.getElementById("initial-view");
  const body = document.body;

  // Event listener to transition from initial view to main content
  if (initialView) {
    initialView.addEventListener("click", function() {
      body.classList.remove("initial-loading");
      body.classList.add("loaded");
    });
  }

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

  // Helper functions for content toggling
  function toggleContent(content) {
    if (content && content.classList) {
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
  }

  function hideContent(contents) {
    contents.forEach(content => {
      if (content && content.classList) {
        content.classList.remove("active");
        content.style.height = "0";
        content.querySelectorAll("p, h2").forEach(element => {

        });
      }
    });
  }

  // Event listeners for navigation buttons
  if (animationsButton) {
    animationsButton.addEventListener("click", function() {
      toggleContent(animationsContent);
      hideContent([pencilContent, digitalContent, inkContent,penContent,sketchesContent, comicsContent, illustraceContent, traditionalContent, aboutContent, moreInfoSection]);
    });
  }

  if (digitalButton) {
    digitalButton.addEventListener("click", function() {
      toggleContent(digitalContent);
      hideContent([pencilContent, penContent, inkContent, animationsContent, comicsContent, illustraceContent, traditionalContent, aboutContent, moreInfoSection]);
    });
  }

  if (pencilButton) {
    pencilButton.addEventListener("click", function() {
      toggleContent(pencilContent);
      hideContent([digitalContent, penContent, inkContent, animationsContent, comicsContent, illustraceContent, traditionalContent, aboutContent, moreInfoSection]);
    });
  }

  if (penButton) {
    penButton.addEventListener("click", function() {
      toggleContent(penContent);
      hideContent([pencilContent, digitalContent, inkContent, animationsContent, comicsContent, illustraceContent, traditionalContent, aboutContent, moreInfoSection]);
    });
  }

  if (inkButton) {
    inkButton.addEventListener("click", function() {
      toggleContent(inkContent);
      hideContent([pencilContent, digitalContent, penContent, animationsContent, comicsContent, illustraceContent, traditionalContent, aboutContent, moreInfoSection]);
    });
  }

  if (comicsButton) {
    comicsButton.addEventListener("click", function() {
      toggleContent(comicsContent);
      hideContent([animationsContent, digitalContent, inkContent,penContent, illustraceContent, traditionalContent, aboutContent, moreInfoSection]);
    });
  }

  if (illustraceButton) {
    illustraceButton.addEventListener("click", function() {
      toggleContent(illustraceContent);
      hideContent([pencilContent, digitalContent, inkContent,penContent,animationsContent, comicsContent, traditionalContent, aboutContent, moreInfoSection]);
    });
  }

  if (traditionalButton) {
    traditionalButton.addEventListener("click", function() {
      toggleContent(traditionalContent);
      hideContent([pencilContent, digitalContent, inkContent,penContent,animationsContent, comicsContent, illustraceContent, aboutContent, moreInfoSection]);
    });
  }

  if (aboutButton) {
    aboutButton.addEventListener("click", function() {
      toggleContent(aboutContent);
      hideContent([pencilContent, digitalContent, inkContent,penContent, animationsContent, comicsContent, illustraceContent, traditionalContent, moreInfoSection]);
    });
  }

  document.getElementById("tell-me-more-btn").addEventListener("click", function() {
    const moreInfoSection = document.getElementById("more-info");

    if (!moreInfoSection.classList.contains("active")) {
      moreInfoSection.classList.add("active"); // Добавляем класс активного состояния
    }

    // Прокрутка к секции плавно
    $('html, body').animate({
      scrollTop: $(moreInfoSection).offset().top
    }, 1000);
  });



  // Language switching functionality
  const languages = [
    { code: "cs", text: "Portfolio\nSofia Šustová" },
    { code: "ru", text: "Портфолио\nСофия Шустова" },
    { code: "es", text: "포트폴리오\n소피아 슈스토바" },
    { code: "fa", text: "نمونه کارها\nصوفیا شوستوا" },
    { code: "en", text: "Portfolio\nSofiia Shustova" },
    { code: "ja", text: "ポートフォリオ\nショフィアシュストワ" },
    { code: "de", text: "Portfolio\nSofia Schustowa" },
    { code: "zh", text: "投资组合\n索菲亚舒斯托娃" }
  ];

  const header = document.getElementById("portfolio-header");
  const author = document.getElementById("author");
  const header_init = document.getElementById("portfolio-header_init");
  const author_init = document.getElementById("author_init");

  let currentLanguageIndex = 0;

  function changeLanguage() {
    if (header && author && header_init && author_init) {
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
      }, 500);
    }
  }

  setInterval(changeLanguage, 1500);
});

$(document).ready(function() {
  init();

  function openImageModal(imgSrc, captionText) {
    $('#image-modal-img').attr('src', imgSrc);
    $('#image-modal-caption').text(captionText);
    $('#image-modal').css('display', 'block').find('.image-modal-content').css('animation', 'scaleUp 0.3s ease-in-out');
  }

  function closeImageModal() {
    $('#image-modal').css('animation', 'fadeOut 0.5s ease-in-out').on('animationend', function() {
      $(this).css('display', 'none').css('animation', '').off('animationend');
    });
  }

  $('body').on('click', '.card a', function(event) {
    if ($(this).closest('.instagram-button').length === 0) {
      event.preventDefault();
      openImageModal($(this).attr('href'), $(this).next('p').text());
    }
  });

  $('.image-modal-close').click(closeImageModal);
  $('#image-modal').click(function(event) {
    if ($(event.target).is('#image-modal')) closeImageModal();
  });

  $('#tell-me-more-btn').click(function() {
    $('#more-info').fadeIn();
    $('html, body').animate({ scrollTop: $('#more-info').offset().top }, 1000);
  });
});

function init() {
  $.getJSON("images.json", imagesOut);
}

function imagesOut(data) {
  var animationsOut = '';
  var illustrationOut = '';
  var comicsOut = '';
  var traditionalOut = '';

  var digitalOut = '';
  var pencilOut = '';
  var penOut = '';
  var inkOut = '';

  for (var key in data) {
    var item = data[key];
    var card = '<div class="card">';

    if (item.category === 'illustration') {
      card += `<a href="${item.img}"><img src="${item.img}" alt="${item.description}"></a>`;
      card += `<p>${item.description}</p>`;
      card += `</button>`;
      card += `</div>`;
      illustrationOut += card;
    }
    else if (item.category === 'animations') {
      card += `<video src="${item.img}" alt="${item.description}" controls></video>`;
      card += `<p>${item.description}</p>`;
      card += `</div>`;
      animationsOut += card;
    }
    else if (item.category === 'comics') {
      card += `<a href="${item.img}"><img src="${item.img}" alt="${item.description}"></a>`;
      card += `<p>${item.description}</p>`;
          card += `</div>`;
      comicsOut += card;
    }else if (item.category === 'traditional') {
      card += `<a href="${item.img}"><img src="${item.img}" alt="${item.description}"></a>`;
      card += `<p>${item.description}</p>`;
          card += `</div>`;
      traditionalOut += card;
    }else if (item.category === 'digital') {
      card += `<a href="${item.img}"><img src="${item.img}" alt="${item.description}"></a>`;
      card += `<p>${item.description}</p>`;
          card += `</div>`;
      digitalOut += card;
    }else if (item.category === 'pen') {
      card += `<a href="${item.img}"><img src="${item.img}" alt="${item.description}"></a>`;
      card += `<p>${item.description}</p>`;
      card += `</div>`;
      penOut += card;
    }else if (item.category === 'pencil') {
      card += `<a href="${item.img}"><img src="${item.img}" alt="${item.description}"></a>`;
      card += `<p>${item.description}</p>`;
      card += `</div>`;
      pencilOut += card;
    }else if (item.category === 'ink') {
      card += `<a href="${item.img}"><img src="${item.img}" alt="${item.description}"></a>`;
      card += `<p>${item.description}</p>`;
      card += `</div>`;
      inkOut += card;
    }
  }

  $('#animations-content').html(animationsOut);
  $('#illustrace-content').html(illustrationOut);
  $('#traditional-content').html(traditionalOut);
  $('#comics-content').html(comicsOut);

  $('#digital-content').html(digitalOut);
  $('#pen-content').html(penOut);
  $('#pencil-content').html(pencilOut);
  $('#ink-content').html(inkOut);
}
