const fs = require('fs');

function writeToFile(fileName, data, callback) {
    fs.writeFile(fileName, data, 'utf-8', function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, 'Data has been written to ' + fileName);
        }
    });
}

writeToFile('output.txt', 'Hello, this is some data!', function(err, message) {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log(message);
    }
});
