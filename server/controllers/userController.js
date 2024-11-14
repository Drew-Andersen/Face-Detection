const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    // create a user, sign a token, and send it back (to client/src/pages/signup/Signup)
    async createUser ({ body }, res) {
        console.log(body);
        const user = await User.create(body);

        if(!user){
            return res.status(400).json({ message: `Something is wrong!`});
        }
        const token = signToken(user);
        console.log(user, token);
        res.json({ token, user });
    },

    // get a single user by either their id or their name
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { name: params.name }],
        });

        if(!foundUser){
            return res.status(400).json({ message: `Cannot find a user with that id!` });
        }

        res.json(foundUser);
    },

    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    async login ({ body }, res) {
        const user = await User.findOne({
            $or: [{ name: body.name }, { email: body.email }]
        });
        if(!user){
            return res.status(400).json({ message: "Can't find this user" });
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if(!correctPw){
            return res.status(400).json({ message: `Wrong password`});
        }
        const token = signToken(user);
        res.json({ token, user });
    },

    // get a single user by either their id or their username
    async getUsers(req, res) {
        const foundUsers = await User.find();

        if(!foundUsers){
            return res.status(400).json({ message: `Cannon find a user with this id! `});
        }

        res.json(foundUsers);
    },

    //remove user
    async removeUser(req, res){
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if(!user){
                return res.status(404).json({ message: `No user found with this id!` });
            }

            res.json({ message: ` User successfully deleted!` });
        } catch(err) {
            res.status(500).json(err);
        }
    }
}