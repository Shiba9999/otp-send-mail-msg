function registerUser(req, res) {
    console.log(req.body);
    res.send("heelo new");
}

module.exports = { registerUser };
