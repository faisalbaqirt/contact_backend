const ContactModel = require("../models/contactModel");
const CloudinaryService = require("../services/cloudinaryService");
const fs = require("fs");

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

const getContactByLabel = async (req, res) => {
  try {
    const userId = req.user.id;
    const label = req.params.label_name;
    const data = await ContactModel.getContactByLabel(userId, label);

    if (data.length === 0) {
      return res.json({
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

const updateContactPhoto = async (req, res) => {
  try {
    const photo = req.file.path;

    // upload gambar ke Cloudinary
    const folderName = "contacts";
    const photoURL = await CloudinaryService.uploadCloudinary(
      photo,
      folderName
    );

    fs.unlinkSync(photo);

    await ContactModel.updateContactPhoto(req.params.id, photoURL);

    res.status(201).json({
      status: 201,
      id: req.params.id,
      photo: photoURL,
      message: "Photo updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { newStatus } = req.body
    await ContactModel.updateContactStatus(req.params.id, newStatus);

    res.status(201).json({
      status: 201,
      id: req.params.id,
      message: "Status updated successfully",
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

const removeLabelFromAllContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { label } = req.body;

    await ContactModel.removeLabelFromAllContact(userId, label);

    res.status(201).json({
      status: 201,
      message: "Successfully remove label from all contact",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const removeLabelFromContact = async (req, res) => {
  try {
    const { label } = req.body;

    await ContactModel.removeLabelFromContact(req.params.id, label);

    res.status(201).json({
      status: 201,
      id: req.params.id,
      message: "Successfully remove label from contact",
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
  getContactByLabel,
  createContact,
  updateContact,
  updateContactPhoto,
  updateContactStatus,
  deleteContact,
  addLabelToContact,
  removeLabelFromAllContact,
  removeLabelFromContact,
};
