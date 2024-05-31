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

setInterval(changeLanguage, 3000);





document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const fileInput = document.getElementById('images');
    const categorySelect = document.getElementById('category');
    const instaLinkInput = document.getElementById('insta_link');
    const descriptionInput = document.getElementById('description');

    fileInput.addEventListener('change', function () {
        const files = Array.from(fileInput.files);
        const isPNG = files.every(file => file.type === 'image/png');
        const isMP4 = files.every(file => file.type === 'video/mp4');

        if (!isPNG && !isMP4) {
            alert('Please select only PNG or MP4 files.');
            fileInput.value = '';
            return;
        }

        // Update category options based on file type
        categorySelect.innerHTML = '';
        if (isPNG) {
            categorySelect.innerHTML = `
                <option value="" disabled selected>Select a category</option>
                <option value="sketch">Sketch</option>
                <option value="art">Art</option>
            `;
        } else if (isMP4) {
            categorySelect.innerHTML = `
                <option value="" disabled selected>Select a category</option>
                <option value="animation">Animation</option>
            `;
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const insta_link = instaLinkInput.value;
        const description = descriptionInput.value;
        const category = categorySelect.value;

        // Check if required fields are filled
        if (insta_link === '' || description === '' || category === '') {
            alert('Please fill in all required fields.');
            return; // Stop form submission if any field is empty
        }

        // Validate Instagram link
        if (!insta_link.startsWith('https://www.instagram.com/')) {
            alert('Please enter a valid Instagram link. Example: https://www.instagram.com/...');
            return;
        }

        // Validate description length
        if (description.length > 100) {
            alert('Description must be 100 characters or less.');
            return;
        }

        // Convert files to base64 strings
        const images = fileInput.files;
        if (images.length === 0) {
            alert('Please select at least one image.');
            return; // Stop form submission if no files are selected
        }

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

    function updatePortfolio(newEntry) {
        return fetch('/updatePortfolio', {
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
});
