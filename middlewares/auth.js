import User from "../database/models/User";

export default function isAuthentified(req, res, next) {
    const userId = req.session.user ? req.session.user._id : null;
    User.findById(userId).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (!user) {
                res.redirect('/login');
            } else {
                return next();
            }
        }
    });
}
