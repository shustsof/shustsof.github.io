document.addEventListener("DOMContentLoaded", function() {
  const sketchesButton = document.getElementById("sketches-button");
  const artsButton = document.getElementById("arts-button");
  const animationsButton = document.getElementById("animations-button");
  const aboutButton = document.getElementById("about-button");

  const sketchesContent = document.getElementById("sketches-content");
  const artsContent = document.getElementById("arts-content");
  const animationsContent = document.getElementById("animations-content");
  const aboutContent = document.getElementById("about-content");

  sketchesButton.addEventListener("click", function() {
    toggleContent(sketchesContent);
    hideContent([animationsContent, artsContent, aboutContent]);
  });

  artsButton.addEventListener("click", function() {
    toggleContent(artsContent);
    hideContent([sketchesContent, animationsContent, aboutContent]);
  });

  animationsButton.addEventListener("click", function() {
    toggleContent(animationsContent);
    hideContent([sketchesContent, artsContent, aboutContent]);
  });

  aboutButton.addEventListener("click", function() {
    toggleContent(aboutContent);
    hideContent([sketchesContent, animationsContent, artsContent]);
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
    // Function to hide content
    contents.forEach(content => {
      content.classList.remove("active");
      content.style.height = "0";
      content.querySelectorAll("p, h2").forEach(element => {
        element.style.opacity = 0;
      });
    });
  }


  // Чтение JSON файла
  fetch('images.json')
      .then(response => response.json())
      .then(data => {
        // Перебираем каждую запись в JSON
        Object.keys(data).forEach(key => {
          const item = data[key];

          // Создаем элементы HTML
          const card = document.createElement('div');
          card.classList.add('card');

          let content; // Для хранения секции, куда будет добавлена карточка
          let openButton; // Для хранения кнопки arrow

          // Создаем кнопку arrow
          openButton = document.createElement('button');
          openButton.classList.add('open-card-button');
          openButton.innerHTML = '<img src="img/arrow-icon.png" alt="open Card">';

          // Определяем категорию и создаем соответствующий элемент
          if (item.category === 'animation') {
            content = document.getElementById('animations-content');
            const video = document.createElement('video');
            video.src = item.img;
            card.appendChild(video);
          } else if (item.category === 'sketch') {
            content = document.getElementById('sketches-content');
            const image = document.createElement('img');
            image.src = item.img;
            card.appendChild(image);
          } else {
            // Добавьте обработку других категорий по необходимости
            return; // Пропускаем записи с неопределенными категориями
          }

          // Создаем кнопку Instagram
          const instagramButton = document.createElement('button');
          instagramButton.classList.add('instagram-button');
          const instagramLink = document.createElement('a');
          instagramLink.href = item.insta;
          instagramLink.target = '_blank';
          const instagramImage = document.createElement('img');
          instagramImage.src = 'img/INSTA.png';
          instagramImage.alt = 'Instagram';
          instagramLink.appendChild(instagramImage);
          instagramButton.appendChild(instagramLink);

          // Создаем описание
          const description = document.createElement('p');
          description.textContent = item.description;

          // Добавляем элементы в карточку
          card.appendChild(openButton); // Добавляем кнопку arrow
          card.appendChild(instagramButton);
          card.appendChild(description);

          // Добавляем карточку в соответствующую секцию
          content.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching JSON:', error));});



