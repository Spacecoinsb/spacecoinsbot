<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Telegram Web App</title>
    <style>
        .button:not(:last-child) {
            margin-bottom: 20px;
        }

        #usercard {
            text-align: center;
        }
    </style>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
</head>
<body>
    <div id="usercard">
        <h1>Welcome, <span id="username"></span>!</h1>
    </div>
    <button class="button" onclick="sendData()">Send Data to Bot</button>

    <script>
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.MainButton.text = "Send Data";
        tg.MainButton.show();

        document.getElementById('username').innerText = tg.initDataUnsafe.user.first_name;

        function sendData() {
            const data = { message: "Hello from the web app!" };
            tg.sendData(JSON.stringify(data));
        }
    </script>
</body>
</html>
