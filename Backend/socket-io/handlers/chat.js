module.exports = (io, socket) => {
  console.log(`${socket.user.name} Connected`);

  socket.on("disconnect", () => {
    console.log(`${socket.user.name} Disconnected`);
  });
};
