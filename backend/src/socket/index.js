const rooms = {};

const newJoinCallback = (roomId, signalData, socket) => {
  // Prevent more than 2 users joining the same room.
  if (rooms[roomId] && rooms[roomId].size == 2) {
    socket.emit('max-limit', socket.id);
    return;
  }
  
  // Enrolls user in the given room.
  socket.join(roomId);

  // TODO: Empty rooms as users leave out.

  // Stores and emits ID to the joined user.
  if (rooms[roomId]) {
    rooms[roomId].add(socket.id);
  } else {
    rooms[roomId] = new Set().add(socket.id);
  }

  // Let user know about his UserID for future communication with server.
  socket.emit('my-user-id', { id: socket.id, isFirstUser: rooms[roomId].size === 1 });

  // Broadcasts new user joining info to all other users.
  socket.to(roomId).emit('call-user', socket.id, signalData);
};

const socketCallback = socket => {
  // Listens to new user joining the room (with given roomId).
  socket.on('join', ({ roomId, signalData }) =>
    newJoinCallback(roomId, signalData, socket)
  );

  socket.on('accept-call', ({ calledBy, signalData }) =>
    socket.to(calledBy).emit('accepted-call', socket.id, signalData)
  );

  socket.on('disconnect', (...args) => console.log('Disconnect: ', args));
  socket.on('connect_error', (...args) => console.log('Connect Error: ', args));
};

module.exports = socketCallback;
