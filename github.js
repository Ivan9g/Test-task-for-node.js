const https = require('https');

let CHROM_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36 OPR/58.0.3135.127';

exports.getProfile = (username, cb) => {

  let options = {
    host: "api.github.com",
    path: /users/ + username,
    method: 'GET',
    headers: { 'user-agent': CHROM_USER_AGENT }
  };

  search(options, (info) => {
    cb(info);
  });
};

exports.getUsers = (cb) => {

  let options = {
    host: "api.github.com",
    path: '/search/users?q=location%3Aodessa&s=followers&type=Users',
    method: 'GET',
    headers: { 'user-agent': CHROM_USER_AGENT }
  };

  search(options, (info) => {
    cb(info);
  });
};


function search(options, cb) {
  let request = https.request(options, (respons) => {
    let body = '';

    respons.on('data', (out) => {
      body += out;
    });

    respons.on('end', (out) => {
      let json = JSON.parse(body);
      cb(json);
    });
  });

  request.on('error', (e) => {
    console.log(e);
  });

  request.end();
};
