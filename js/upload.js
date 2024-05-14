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







document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const fileInput = document.getElementById('images');

    // Trigger file input click event when "Update" button is clicked
    document.getElementById('update_button').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default button behavior
        // Trigger click on file input only if files are not already selected
        if (fileInput.files.length === 0) {
            fileInput.click(); // Trigger file input click event
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const insta_link = document.getElementById('insta_link').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        // Check if required fields are filled
        if (insta_link === '' || description === '' || category === '') {
            alert('Please fill in all required fields.');
            return; // Stop form submission if any field is empty
        }

        // Convert files to base64 strings
        const images = fileInput.files;
        const promises = Array.from(images).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        // Wait for all files to be converted
        Promise.all(promises).then(base64Images => {
            // Construct JSON object for the new entry
            const newEntry = {
                "img": base64Images, // Store base64-encoded images
                "insta": insta_link,
                "description": description,
                "category": category
            };

            // Update portfolio on the server
            updatePortfolio(newEntry)
                .then(() => {
                    // Redirect to index.html after successful update
                    window.location.href = 'index.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to update portfolio. Please try again later.');
                });
        });
    });
});

function updatePortfolio(newEntry) {
    return fetch('/updatePortfolio', { // Assuming the server endpoint is '/updatePortfolio'
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}
