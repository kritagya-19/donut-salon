import http from 'http';
import fs from 'fs';

const data = JSON.stringify({
    name: "Test Receptionist Link",
    phone: "0000000000",
    email: "test@example.com",
    service: "Makeup",
    date: new Date().toISOString().split('T')[0],
    time: "12:00"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/book',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        fs.writeFileSync('test_result.json', responseData);
    });
});

req.on('error', (error) => {
    fs.writeFileSync('test_result.json', JSON.stringify({ error: error.message }));
});

req.write(data);
req.end();
