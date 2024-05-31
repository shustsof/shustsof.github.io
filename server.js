const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const JSON_FILE_PATH = path.join(__dirname, 'images.json');

// Настройка для раздачи статических файлов из директории текущего проекта
app.use(express.static(__dirname));

// Настройка body-parser для обработки JSON запросов
app.use(bodyParser.json({ limit: '50mb' }));

// Обработка запроса на обновление портфолио
app.post('/updatePortfolio', (req, res) => {
    const newEntry = req.body;

    // Читаем текущий JSON файл
    fs.readFile(JSON_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Failed to read JSON file' });
        }

        let jsonData = JSON.parse(data);

        // Генерируем новый ID для нового элемента
        const newId = ('0000' + (Object.keys(jsonData).length + 1)).slice(-4);
        jsonData[newId] = newEntry;

        // Записываем обновленный JSON обратно в файл
        fs.writeFile(JSON_FILE_PATH, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return res.status(500).json({ error: 'Failed to write JSON file' });
            }

            res.json({ success: true });
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
