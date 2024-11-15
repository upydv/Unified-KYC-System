
require('dotenv').config();
const express = require("express");
const path = require("path");
const multer = require('multer');
const LogInCollection = require("./mongo");
const { BinarySearchTree } = require("./binarySearchTree");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');



// Admin Page Route
app.get('/admin', (req, res) => {
    res.render('admin'); // Render admin page template
});

// Search Functionality
app.post('/admin/search', async (req, res) => {
    try {
        const { generatedNumber } = req.body;
        const user = await LogInCollection.findOne({ generatedNumber });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render('admin', { user }); // Render admin page with found user details
    } catch (error) {
        console.error('Error searching for user:', error);
        res.status(500).send("Internal Server Error");
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const userName = req.body.name;
        const user = await LogInCollection.findOne({ name: userName });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const filesData = [];
        req.files.forEach(async (file) => {
            filesData.push({
                fileName: file.originalname,
                filePath: file.path
            });
        });

        user.files = user.files.concat(filesData);
        await user.save();

        res.status(200).send('Files uploaded successfully');
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to view uploaded files
app.get('/files', async (req, res) => {
    try {
        const user = await LogInCollection.findOne({ name: req.query.name });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('files', { files: user.files });
    } catch (error) {
        console.error('Error retrieving files:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    try {
        const { name, password, PhoneNumber, EmailAddress, state, DateofBirth } = req.body;
        const existingUser = await LogInCollection.findOne({ name });
        if (existingUser) {
            return res.send("User already exists");
        }
        const generatedNumber = generateRandomNumber(state);
        const newUser = new LogInCollection({
            name,
            password,
            PhoneNumber,
            EmailAddress,
            state,
            DateofBirth,
            generatedNumber
        });
        await newUser.save();
        res.status(201).render("home", { naming: name, generatedNumber });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await LogInCollection.findOne({name, password});
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(201).render("home", { naming: `${name}`, generatedNumber: user.generatedNumber });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function generateRandomNumber(stateName) {
    const stateInitials = {
        'Andhra Pradesh': 'AP',
        'Arunachal Pradesh': 'AR',
        'Assam': 'AS',
        'Bihar': 'BR',
        'Chhattisgarh': 'CG',
        'Goa': 'GA',
        'Gujarat': 'GJ',
        'Haryana': 'HR',
        'Himachal Pradesh': 'HP',
        'Jammu and Kashmir': 'JK',
        'Jharkhand': 'JH',
        'Karnataka': 'KA',
        'Kerala': 'KL',
        'Madhya Pradesh': 'MP',
        'Maharashtra': 'MH',
        'Manipur': 'MN',
        'Meghalaya': 'ML',
        'Mizoram': 'MZ',
        'Nagaland': 'NL',
        'Odisha': 'OD',
        'Punjab': 'PB',
        'Rajasthan': 'RJ',
        'Sikkim': 'SK',
        'Tamil Nadu': 'TN',
        'Telangana': 'TS',
        'Tripura': 'TR',
        'Uttarakhand': 'UK',
        'Uttar Pradesh': 'UP',
        'West Bengal': 'WB',
        'Andaman and Nicobar Islands': 'AN',
        'Chandigarh': 'CH',
        'Dadra and Nagar Haveli and Daman and Diu': 'DN',
        'Delhi': 'DL',
        'Lakshadweep': 'LD',
        'Ladakh': 'LA',
        'Puducherry': 'PY',
    };
    const stateInitial = stateInitials[stateName];
    if (stateInitial) {
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        return `${stateInitial}-${randomNumber}`;
    } else {
        throw new Error('Invalid state name');
    }
}
