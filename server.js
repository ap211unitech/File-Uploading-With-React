const express = require("express");
const app = express();

const fileUplaod = require("express-fileupload");
app.use(fileUplaod());

// Uploading File
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    const newFileName = `${Date.now()}_${file.name}`;

    file.mv(`${__dirname}/client/public/uploads/${newFileName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        return res.status(200).json({ fileName: file.name, filePath: `/uploads/${newFileName}` });
    });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
})