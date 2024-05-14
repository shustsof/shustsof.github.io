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

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const images = document.getElementById('images').files;
        const insta-link = document.getElementById('insta-link').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        // Convert files to base64 strings
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
                "insta": insta-link, // Assuming the Instagram link is in the title field
                "description": description,
                "category": category
            };

            // Load existing JSON data
            fetch('images.json')
                .then(response => response.json())
                .then(data => {
                    // Generate a new ID by incrementing the last ID or starting from 1 if no data exists
                    let lastId = Object.keys(data).length > 0 ? parseInt(Object.keys(data)[Object.keys(data).length - 1]) : 0;
                    const newId = (lastId + 1).toString().padStart(4, '0'); // Ensure 4-digit format

                    // Add the new entry to the existing data
                    data[newId] = newEntry;

                    // Update images.json with the updated data
                    return fetch('images.json', {
                        method: 'PUT', // Assuming you're updating the entire JSON file
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                })
                .then(() => {
                    // Optionally, you can redirect the user to another page or display a success message
                    // window.location.href = 'success.html';
                    // alert('Portfolio updated successfully!');
                })
                .catch(error => console.error('Error:', error));
        });
    });
});