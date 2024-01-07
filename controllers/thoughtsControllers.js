const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .populate("reactions");

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID buddy" });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      });

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "Error creating thought - User not found with that ID buddy",
          });
      }

      res.status(200).json({ thought, user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID buddy" });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID buddy" });
      }

      const userUpdate = await User.updateMany(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { runValidators: true, new: true }
      );

      const [updatedResult] = await Promise.all([ userUpdate ]);

      if (updatedResult.nModified < 1 ) {
        return res.status(404).json({ message: "No user found with that ID buddy" });
      }

      res.status(200).json({ thought,  message: 'thought deleted'});
    } catch (err) {
          console.error(err);

      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID buddy" });
      }

      res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({
            message: "please double check the Thought or reaction ID buddy",
          });
      }

      res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
