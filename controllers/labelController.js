const LabelModel = require("../models/labelModel");

const getAllLabels = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await LabelModel.getAllLabels(userId);

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const createLabel = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    await LabelModel.createLabel(userId, name);

    res.status(201).json({
      status: 201,
      message: "Successfully create label",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const deleteLabel = async (req, res) => {
  try {
    await LabelModel.deleteLabel(req.params.id);

    res.status(201).json({
      status: 201,
      id: req.params.id,
      message: "Label deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  getAllLabels,
  createLabel,
  deleteLabel,
};
