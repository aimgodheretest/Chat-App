module.exports = (io, socket) => {
  socket.on("join_group", (groupName) => {
    socket.join(groupName);

    console.log(`${socket.user.name} joined group ${groupName}`);
  });

  socket.on("group_message", (data) => {
    io.to(data.groupName).emit("receive_group_message", {
      sender: socket.user.name,
      message: data.message,
    });
  });

  // GROUP MEDIA
  socket.on("group_media", (data) => {
    io.to(data.groupName).emit("receive_group_media", {
      sender: socket.user.name,
      url: data.url,
    });
  });
};
