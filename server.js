const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(express.urlencoded({ extended: true }));

// Serve static files after session middleware
app.use(express.static('public', {
    index: false // Disable automatic serving of index.html
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session && req.session.authenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

// Read valid keys
let validKeys = [];
try {
    const keysData = fs.readFileSync('keys', 'utf8');
    validKeys = keysData.split('\n').map(key => key.trim()).filter(Boolean);
} catch (error) {
    console.error('Error reading keys file:', error);
}

// Routes
app.get('/', (req, res) => {
    if (req.session.authenticated) {
        res.redirect('/website');
    } else {
        // Destroy any existing session to prevent reuse
        if (req.session) {
            req.session.destroy(() => {
                res.sendFile(path.join(__dirname, 'public', 'auth.html'));
            });
        } else {
            res.sendFile(path.join(__dirname, 'public', 'auth.html'));
        }
    }
});

app.post('/verify-key', (req, res) => {
    const { key } = req.body;
    if (validKeys.includes(key)) {
        // Regenerate session to prevent session fixation
        req.session.regenerate((err) => {
            if (err) {
                console.error('Session regeneration error:', err);
                return res.redirect('/?error=invalid');
            }
            req.session.authenticated = true;
            res.redirect('/website');
        });
    } else {
        res.redirect('/?error=invalid');
    }
});

app.get('/website', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
