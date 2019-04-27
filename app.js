const git = require('./github');
const fs = require('fs');


function search(cb) {
  let top = [];
  git.getUsers((info) => {
    for (var i = 0; i < 10; i++) {
      git.getProfile(info.items[i].login, (profile) => {
        top.push(
          {
            login: profile.login,
            name: profile.name,
            location: profile.location,
            email: profile.email,
            bio: profile.bio,
            followers: profile.followers
          }
        );
        cb(top);
      });
    }
  });
};

setInterval(() => {
  search((info) => {
    fs.writeFile("./dataword.json", "", function(error,data){});
    fs.appendFileSync("./dataword.json", JSON.stringify(info));
  });
}, 1000 * 60 * 60);

let test = JSON.parse(fs.readFileSync("./dataword.json", "utf8"));
console.log(test);
