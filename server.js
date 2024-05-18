const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/tapswap', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    balance: Number,
    multitapLevel: Number,
    energyLimitLevel: Number,
    rechargeSpeedLevel: Number,
    tapBotPurchased: Boolean,
});

const User = mongoose.model('User', userSchema);

// Маршрут для сохранения или обновления данных пользователя
app.post('/save', async (req, res) => {
    const { username, balance, multitapLevel, energyLimitLevel, rechargeSpeedLevel, tapBotPurchased } = req.body;
    const user = await User.findOneAndUpdate(
        { username },
        { balance, multitapLevel, energyLimitLevel, rechargeSpeedLevel, tapBotPurchased },
        { new: true, upsert: true }
    );
    res.json(user);
});

// Маршрут для получения данных пользователя
app.get('/load/:username', async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
});

// Маршрут для получения топ игроков
app.get('/top', async (req, res) => {
    const topUsers = await User.find().sort({ balance: -1 }).limit(10);
    res.json(topUsers);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
