// Language switching functionality
const languages = [
    { code: "cs", text: "Portfolio\nSofia Šustová" }, // Czech
    { code: "ru", text: "Портфолио\nСофия Шустова" }, // Russian
    { code: "es", text: "포트폴리오\n소피아 슈스토바" }, // Korean (should be corrected to Spanish if needed)
    { code: "fa", text: "نمونه کارها\nصوفیا شوستوا" }, // Persian
    { code: "en", text: "Portfolio\nSofiia Shustova" }, // English
    { code: "ja", text: "ポートフォリオ\nショフィアシュストワ" }, // Japanese
    { code: "de", text: "Portfolio\nSofia Schustowa" }, // German
    { code: "zh", text: "投资组合\n索菲亚舒斯托娃" } // Chinese
];

const header = document.getElementById("portfolio-header");
const author = document.getElementById("author");
let currentLanguageIndex = 0;

function changeLanguage() {
    header.classList.remove("fade-in");
    author.classList.remove("fade-in");
    setTimeout(() => {
        currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
        const { text } = languages[currentLanguageIndex];
        const [portfolioText, authorText] = text.split("\n");
        header.textContent = portfolioText;
        author.textContent = authorText;
        header.classList.add("fade-in");
        author.classList.add("fade-in");
    }, 500);
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

        const insta_link = instaLinkInput.value;
        const description = descriptionInput.value;
        const category = categorySelect.value;

        if (insta_link === '' || description === '' || category === '') {
            alert('Please fill in all required fields.');
            return;
        }

        if (!insta_link.startsWith('https://www.instagram.com/')) {
            alert('Please enter a valid Instagram link. Example: https://www.instagram.com/...');
            return;
        }

        if (description.length > 100) {
            alert('Description must be 100 characters or less.');
            return;
        }

        const images = fileInput.files;
        if (images.length === 0) {
            alert('Please select at least one image.');
            return;
        }

        const promises = Array.from(images).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(base64Images => {
            const newEntry = {
                "img": base64Images,
                "insta": insta_link,
                "description": description,
                "category": category
            };

            upload(newEntry)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to update portfolio. Please try again later.');
                });
        });
    });

    async function upload(newEntry) {
        try {
            const response = await fetch('/upload', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEntry)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
});
const cors = require('cors');
app.use(cors());
