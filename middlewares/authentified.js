export default function ifAuthentified(req, res, next) {
    if (req.session.user)
        res.redirect('/');
    else return next();
}
