const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get single user
        getSingleUser: async (parent, {username} , context) => {
            if (context.user) {
                const foundUser = await User.findOne({$or:[{_id: context.user._id},{ username }]}).populate('books');

                return foundUser;
            }

            throw new AuthenticationError('Not logged in')
        },
    },

    Mutation: {
        // createUser

        // login

        // save book

        // delete book
    }
}