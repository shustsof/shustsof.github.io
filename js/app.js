
const dbName = "PortfolioDB";
let db;


document.addEventListener("DOMContentLoaded", async function () {
  await openDatabase();

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
    {code: "cs", text: "Portfolio\nSofia Šustová"}, // Чешский
    {code: "ru", text: "Портфолио\nСофия Шустова"}, // Русский
    {code: "es", text: "포트폴리오\n소피아 슈스토바"}, // Корейский
    {code: "fa", text: "نمونه کارها\nصوفیا شوستوا"}, // Персидский
    {code: "en", text: "Portfolio\nSofiia Shustova"}, // Английский
    {code: "ja", text: "ポートフォリオ\nショフィアシュストワ"}, // Японский
    {code: "de", text: "Portfolio\nSofia Schustowa"}, // Немецкий
    {code: "zh", text: "投资组合\n索菲亚舒斯托娃"} // Китайский

  ];
  const header = document.getElementById("portfolio-header");
  const author = document.getElementById("author"); // Получаем параграф с именем

  let currentLanguageIndex = 0;

  function changeLanguage() {
    header.classList.remove("fade-in");
    author.classList.remove("fade-in"); // Добавляем удаление класса анимации с именем
    setTimeout(() => {
      currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
      const {text} = languages[currentLanguageIndex];
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

// Функция для создания карточки изображения или видео
  function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');

    let media;
    if (item.category === 'animation') {
      media = document.createElement('video');
    } else if (item.category === 'sketch') {
      media = document.createElement('img');
    }

    media.src = item.images;
    media.alt = item.description;
    card.appendChild(media);

    const instagramButton = createInstagramButton(item.insta_link);
    const description = createDescription(item.description);

    card.appendChild(description);
    card.appendChild(instagramButton);

    //append card

    return card;
  }

// Функция для создания кнопки Instagram
  function createInstagramButton(instaLink) {
    const button = document.createElement('button');
    button.classList.add('instagram-button');
    const link = document.createElement('a');
    link.href = instaLink;
    link.target = '_blank';
    const image = document.createElement('img');
    image.src = 'img/INSTA.png';
    image.alt = 'Instagram';
    link.appendChild(image);
    button.appendChild(link);
    return button;
  }

// Функция для создания описания
  function createDescription(text) {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
  }

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function(event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains("entries")) {
        db.createObjectStore("entries", { autoIncrement: true });
      }
    };

    request.onsuccess = function(event) {
      db = event.target.result;
      resolve();
    };

    request.onerror = function(event) {
      reject("Database error: " + event.target.errorCode);
    };
  });
}

// Чтение JSON файла и создание карточек
  getAllEntries()
      .then(response => response)
      .then(data => {
        Object.keys(data).forEach(key => {
          const item = data[key];
          const content = (item.category === 'animation') ? document.getElementById('animations-content') : document.getElementById('sketches-content');
          const card = createCard(item);
          content.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching JSON:', error));
})

async function getAllEntries() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["entries"], "readonly");
    const store = transaction.objectStore("entries");
    const request = store.getAll();

    request.onsuccess = function() {
      resolve(request.result);
    };

    request.onerror = function(event) {
      reject("Error fetching data from database: " + event.target.errorCode);
    };
  });
}
