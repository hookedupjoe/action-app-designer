//--- Wrapper for UDP activity
(function () {

    var UDP = {
        // Helper function to create a new socket
        createSocket: function (address, port, callback) {
            chrome.sockets.udp.create(function (socket) {
                chrome.sockets.udp.bind(socket.socketId, address, port, function () {
                    callback(socket, chrome.sockets.udp);
                });
            });
        },

        // All messages must be an ArrayBuffer. This helper
        // converts strings to ArrayBuffers and vice-versa.
        Buffer: {
            fromString: function (string) {
                var buffer = new ArrayBuffer(string.length);
                var bufferView = new Uint8Array(buffer);
                for (var i = 0, strLen = string.length; i < strLen; i++) {
                    bufferView[i] = string.charCodeAt(i);
                }
                return buffer;
            },

            stringify: function (buffer) {
                var bufferView = new Uint8Array(buffer);
                return String.fromCharCode.apply(null, bufferView);
            }
        }
    };

    window.UDP = UDP;





    //--- Wrapper for UDP server

    // Constructor. Address and port should
    // be where you want the server to run.
    var Server = function (address, port) {
        this.address = address;
        this.port = port || 0; // Port zero will auto-assign
    }

    // Convienience helper for setting up a message received
    // callback. Note that we have to stringify the data because
    // it is an ArrayBuffer.
    Server.prototype.onReceive = function (callback) {
        chrome.sockets.udp.onReceive.addListener(function (info) {

            callback(UDP.Buffer.stringify(info.data), info.remoteAddress, info.remotePort, info);
        });
    }

    // Start the server. Once started, the function will
    // yield the actual address and port of the server.
    Server.prototype.listen = function (callback) {
        UDP.createSocket(this.address, this.port, function (socket, udp) {
            udp.getInfo(socket.socketId, function (server) {
                callback(server.localAddress, server.localPort);
            });
        });
    }

    window.UDP.Server = Server;



    // Constructor. The address and port should point to a UDP server.
    var Client = function (address, port) {
        this.address = address;
        this.port = port || 0; // Port zero will auto-assign
    }

    // Send a directly to one controller
    Client.prototype.send = function (message, callback) {
        var address = this.address,
            port = this.port,
            buffer = UDP.Buffer.fromString(message);

        UDP.createSocket(address, port, function (socket, udp) {
            try {
                udp.send(socket.socketId, buffer, address, port, function (info) {
                    callback(info);
                    udp.close(socket.socketId);
                });
            } catch (error) {
                alert("Error " + error.toString())
            }
        });
    }

    // Send a broadcast UDP message to the port
    Client.prototype.sendBroadcast = function (message, callback, optionlAltPort) {
        var address = '255.255.255.255',
            port = optionlAltPort || this.port,
            buffer = UDP.Buffer.fromString(message);

        UDP.createSocket(address, port, function (socket, udp) {
            try {
                chrome.sockets.udp.setBroadcast(socket.socketId, true, function (theResult) {
                    udp.send(socket.socketId, buffer, address, port, function (info) {
                        callback(info);
                        udp.close(socket.socketId);
                    });
                })
            } catch (error) {
                alert("Error " + error.toString())
            }

        });
    }


    window.UDP.Client = Client;

})();



