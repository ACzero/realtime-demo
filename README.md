# Realtime demo

just a demo use socket.io on nodejs to handle realtime message from server side app to client.



## Usage

1. excute command to start server: `node app.js`.
2. visit `localhost:3001`, get the clientid from the page.
3. send message to target client: `curl 'localhost:3001/notify' -d 'clientid=xxx&message=hello'`, then go back to the page.
4. you can open more than two page and try again.