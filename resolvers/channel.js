export default {
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        await models.Channel.create(args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
