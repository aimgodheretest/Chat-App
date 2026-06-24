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
};
