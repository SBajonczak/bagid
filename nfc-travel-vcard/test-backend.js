const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 3001,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log('Backend server is accessible!');
  
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`Problem connecting to backend: ${e.message}`);
});

req.end();
