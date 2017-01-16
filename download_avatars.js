var request = require('request');
var https = require('https');
var fs = require('fs');
var GITHUB_USER = 'iamtonybologna';
var GITHUB_TOKEN = 'b1d448a48b1e6f52b5303b1f899e2c7f3d179478';

var owner;
var repo;
owner = process.argv[2];
repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

if (owner === undefined && repo === undefined) {
  console.log('You didn\'t provide an owner and repo for me! Please run me again: node download_avatars.js <owner> <repo>');
} else if (repo === undefined) {
  console.log('You didn\'t provide an repo for me! Please run me again: node download_avatars.js <owner> <repo>')
} else if (owner === undefined) {
  console.log('You didn\'t provide an owner for me! Please run me again: node download_avatars.js <owner> <repo>')
}

function getRepoContributors(repoOwner, repoName, callback) {


  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request.get(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var body = JSON.parse(body);
      callback(error, body);
    };
  })

};

function downloadImageByURL(url, filePath) {
  request.get(url)
    .pipe(fs.createWriteStream(filePath))
}

  getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
  result.forEach(function(entry) {
    downloadImageByURL(entry.avatar_url + '.png', 'avatars/' + entry.login);
  });
});
