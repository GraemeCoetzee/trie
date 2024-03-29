var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    if(request.url=='/'){
        fs.readFile('./index.html', function (err, html) {
             if (err) {
                  res.send(500,{error: err});
             }
             response.writeHeader(200, {"Content-Type": "text/html"});
             response.write(html);
             response.end();
        });
    } else if(request.url=='/script.js'){
        fs.readFile('./script.js', function (err, jsFile) {
             if (err) {
                  res.send(500,{error: err});
             }
             response.writeHeader(200, {"Content-Type": "text/javascript"});
             response.write(jsFile);
             response.end();
        });
    }

}).listen(3000, () => {
    console.log("Listening on port 3000");
});
