module.exports = (io, socket) => {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);

    console.log(`${socket.user.name} joined room ${roomId}`);
  });

  socket.on("new_message", (data) => {
    console.log("MESSAGE RECEIVED:", data);

    io.to(data.roomId).emit("receive_message", {
      sender: socket.user.name,
      message: data.message,
    });
  });
};
