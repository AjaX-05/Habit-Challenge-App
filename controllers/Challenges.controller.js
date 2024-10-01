const Challenges = require("../models/schema.model");

const controller = {
  get: async (req, res) => {
    try {
      const challenges = await Challenges.find();
      if (!challenges) {
        return res.status(200).send("Empty List. Please add Challenges!!");
      }
      return res.status(200).json({ challenges });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  getId: async (req, res) => {
    try {
      const { id } = req.params;
      const challenge = await Challenges.findById(id);
      if (!challenge) {
        return res.status(404).send("No Challenge Found!!!");
      }
      return res.status(200).json(challenge);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  post: async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send("Enter the details correctly!!!");
      }
      const challenge = await Challenges.create(req.body);
      return res.status(201).json(challenge);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  put: async (req, res) => {
    try {
      const { id } = req.params;
      const challenge = await Challenges.findById(id);
      if (!challenge) {
        return res.status(404).send(`No such ${id} found!!!`);
      }
      const challengeUpdated = await Challenges.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json(challengeUpdated);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const challenge = await Challenges.findById(id);
      if (!challenge) {
        return res.status(404).send("No Id Found!!!");
      }
      const deletedChallenge = await Challenges.findByIdAndDelete(id);
      return res.status(200).json({ deletedChallenge });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
};

module.exports = controller;
