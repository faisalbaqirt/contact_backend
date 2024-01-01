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

const getContactById = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await ContactModel.getContactById(userId, req.params.id);

    if (data.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Contact not found or not registered under your user",
      });
    }

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

const addLabelToContact = async (req, res) => {
  try {
    const { label } = req.body;

    await ContactModel.addLabelToContact(req.params.id, label);

    res.status(201).json({
      status: 201,
      id: req.params.id,
      message: "Successfully add label to contact",
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
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  addLabelToContact
};
