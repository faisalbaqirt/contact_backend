const ContactModel = require("../models/contactModel");

const getAllContactList = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await ContactModel.getAllContactList(userId);

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const createContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, telephone, email, address, labels } = req.body;

    await ContactModel.createContact(
      userId,
      name,
      telephone,
      email,
      address,
      labels
    );

    res.status(201).json({
      status: 201,
      message: "Successfully create contact",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, telephone, email, address, labels } = req.body;

    await ContactModel.updateContact(
      req.params.id,
      name,
      telephone,
      email,
      address,
      labels
    );

    res.status(201).json({
      status: 201,
      id: req.params.id,
      message: "Successfully update contact",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    await ContactModel.deleteContact(req.params.id);

    res.status(201).json({
      status: 201,
      id: req.params.id,
      message: "Contact deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  getAllContactList,
  createContact,
  updateContact,
  deleteContact,
};
