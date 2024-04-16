document.addEventListener("DOMContentLoaded", function() {
  const sketchesButton = document.getElementById("sketches-button");
  const animationsButton = document.getElementById("animations-button");
  const aboutButton = document.getElementById("about-button");

  const sketchesContent = document.getElementById("sketches-content");
  const animationsContent = document.getElementById("animations-content");
  const aboutContent = document.getElementById("about-content");

  sketchesButton.addEventListener("click", function() {
    toggleContent(sketchesContent);
    hideContent([animationsContent, aboutContent]);
  });

  animationsButton.addEventListener("click", function() {
    toggleContent(animationsContent);
    hideContent([sketchesContent, aboutContent]);
  });

  aboutButton.addEventListener("click", function() {
    toggleContent(aboutContent);
    hideContent([sketchesContent, animationsContent]);
  });

  function toggleContent(content) {
    content.classList.toggle("active");
    if (content.classList.contains("active")) {
      content.style.height = content.scrollHeight + "px";
      // Для каждого параграфа и заголовка в контенте устанавливаем opacity в 1, чтобы они появились плавно
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 1;
      });
    } else {
      content.style.height = "0";
      // Для каждого параграфа и заголовка в контенте устанавливаем opacity в 0, чтобы они исчезли плавно
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 0;
      });
    }
  }

  const languages = [
    { code: "cs", text: "Portfolio\nSofia Šustová" }, // Чешский
    { code: "ru", text: "Портфолио\nСофия Шустова" }, // Русский
    { code: "es", text: "포트폴리오\n소피아 슈스토바" }, // Корейский
    { code: "fa", text: "نمونه کارها\nصوفیا شوستوا" }, // Персидский
    { code: "en", text: "Portfolio\nSofiia Shustova" }, // Английский
    { code: "ja", text: "ポートフォリオ\nショフィアシュストワ" }, // Японский
    { code: "de", text: "Portfolio\nSofia Schustowa" }, // Немецкий
    { code: "zh", text: "投资组合\n索菲亚舒斯托娃" } // Китайский

  ];
  const header = document.getElementById("portfolio-header");
  const author = document.getElementById("author"); // Получаем параграф с именем

  let currentLanguageIndex = 0;

  function changeLanguage() {
    header.classList.remove("fade-in");
    author.classList.remove("fade-in"); // Добавляем удаление класса анимации с именем
    setTimeout(() => {
      currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
      const { text } = languages[currentLanguageIndex];
      const [portfolioText, authorText] = text.split("\n"); // Разделяем текст на портфолио и имя
      header.textContent = portfolioText;
      author.textContent = authorText; // Устанавливаем новое имя
      header.classList.add("fade-in");
      author.classList.add("fade-in"); // Добавляем класс анимации с именем
    }, 500); // Добавляем небольшую задержку перед изменением текста, чтобы анимация завершилась
  }

  setInterval(changeLanguage, 3000); // Изменяем язык каждые 3 секунды

  function hideContent(contents) {
    contents.forEach(content => {
      content.classList.remove("active");
      content.style.height = "0";
      // Для каждого параграфа и заголовка в контенте устанавливаем opacity в 0, чтобы они исчезли плавно
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 0;
      });
    });
  }

  // Создание белого квадрата с изображением
  function createImageSquare(imageSrc) {
    var square = document.createElement('div');
    square.className = 'image-square';
    square.style.backgroundImage = 'url(' + imageSrc + ')';
    square.onclick = function() {
      showModal(imageSrc);
    };
    return square;
  }

  // Добавление изображений в указанную секцию
  function addImagesToSection(sectionId, imageSources) {
    var section = document.getElementById(sectionId);
    imageSources.forEach(function(imageSrc) {
      var square = createImageSquare(imageSrc);
      section.appendChild(square);
    });
  }

  // Пример загрузки изображений из JSON файла
  var sketchImages = [
    'img/sketch1.jpg',
    'img/sketch2.jpg',
    'img/sketch3.jpg'
  ];

  var animationImages = [
    'img/animation1.gif',
    'img/animation2.gif',
    'img/animation3.gif'
  ];

  var aboutImages = [
    'img/about1.jpg',
    'img/about2.jpg',
    'img/about3.jpg'
  ];

  // Добавление изображений в соответствующие секции
  addImagesToSection('sketches-content', sketchImages);
  addImagesToSection('animations-content', animationImages);
  addImagesToSection('about-content', aboutImages);
});

