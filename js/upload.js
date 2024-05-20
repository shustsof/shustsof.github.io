
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
const dbName = "PortfolioDB";
let db;


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

const form = document.querySelector('.upload-form');
console.log('form',form)
const fileInput = document.getElementById('images');

async function addEntry(entry) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["entries"], "readwrite");
        const store = transaction.objectStore("entries");
        const request = store.add(entry);

        request.onsuccess = function() {
            resolve();
        };

        request.onerror = function(event) {
            reject("Error writing to the database: " + event.target.errorCode);
        };
    });
}

// Setup complete, integrate with the existing form handling
document.addEventListener('DOMContentLoaded', async () => {
    await openDatabase();
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (fileInput.files.length === 0) {
        fileInput.click();
        return;
    }

    const insta_link = document.getElementById('insta_link').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (insta_link === '' || description === '' || category === '') {
        alert('Please fill in all required fields.');
        return;
    }

    const images = await readFilesAsDataURL(fileInput.files);
    await addEntry({
        insta_link,
        description,
        category,
        images
    });
    console.log('Entry added to the database');
});

async function readFilesAsDataURL(files) {
    const results = [];
    for (const file of files) {
        const dataURL = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });
        results.push(dataURL);
    }
    return results;
}

