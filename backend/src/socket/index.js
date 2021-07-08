const rooms = {};

const newJoinCallback = (roomId, signalData, socket, io) => {
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
    // Broadcasts new user joining info to all other users.
    // Put this here because this runs only when 1 user is present.
    rooms[roomId].forEach(userId =>
      io.to(userId).emit('call-user', socket.id, signalData)
    );
    rooms[roomId].add(socket.id);
  } else {
    rooms[roomId] = new Set().add(socket.id);
  }

  // Let user know about his UserID for future communication with server.
  socket.emit('my-user-id', {
    id: socket.id,
    isFirstUser: rooms[roomId].size === 1,
  });
};

const disconnectCallback = (socket, io, userId) => {
  let roomId = null;
  for (const rId in rooms) {
    if (rooms[rId].has(userId)) {
      roomId = rId;
      break;
    }
  }

  if (roomId) {
    socket.leave(roomId);
    rooms[roomId].delete(userId);
  }

  if (rooms[roomId] && rooms[roomId].size) {
    io.to(roomId).emit('user-left', userId);
  } else if (rooms[roomId]) {
    delete rooms[roomId];
  }
};

const socketCallback = (socket, io) => {
  // Listens to new user joining the room (with given roomId).
  socket.on('join', ({ roomId, signalData }) =>
    newJoinCallback(roomId, signalData, socket, io)
  );

  socket.on('accept-call', ({ calledBy, signalData }) =>
    socket.to(calledBy).emit('accepted-call', socket.id, signalData)
  );

  socket.on('disconnect', () => disconnectCallback(socket, io, socket.id));
};

module.exports = socketCallback;
