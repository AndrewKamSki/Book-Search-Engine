const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get single user
        me: async (parent, {username} , context) => {
            if (context.user) {
                const foundUser = await User.findOne({$or:[{_id: context.user._id},{ username }]}).populate('books');

                return foundUser;
            }

            throw new AuthenticationError('Not logged in')
        },
    },

    Mutation: {
        // addUser
        addUser: async (parent, args, context, info) => {
            const user = await User.create(args);
            if (!user) {
                throw new AuthenticationError('Something is wrong!')
            }
            const token = signToken(user);
            return {token, user};
        },
        // login
        login: async (parent, { email, password }, context, info) => {
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError("Can't find this user or password");
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Can't find this user or password");
            }
            
            const token = signToken(user);
            return {token, user};
        }
        // saveBook

        // removeBook
    }
}