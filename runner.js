var express = require("express"),
  app = express(),
  hostname = process.env.HOSTNAME || '0.0.0.0',
  port = parseInt(process.env.PORT, 10) || 9001,
  publicDir = './';

app.get("/", function (req, res) {
  res.sendFile("/index.html", { root: publicDir } );
});

app.use(express.static(publicDir));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('==============================\nWIX serving on port %s\n==============================', port);