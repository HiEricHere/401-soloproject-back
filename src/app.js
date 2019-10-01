'use strict';

const express = require('express');
const app = express();

app.get('/', imAlive);

function imAlive( request, response ){
  response.send(`I'm aliiiiiive`);
}

module.exports = {
  server: app,
  start: (port) => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`BATTLECRUISER OPERATIONAL: ${PORT}`);
    });
  },
};
