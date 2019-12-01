export default function socketIsAuthentified (socket, next) {
    if (!socket.handshake.session.user) return next(new Error('Authentication error'));
    return next();
}
