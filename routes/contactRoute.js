const express = require("express")
const router = express.Router()
const ContactController = require('../controllers/contactController')
const isAuthenticated = require("../middleware/isAuthenticated")

router.use(isAuthenticated)

router.get("/", ContactController.getAllContactList)
router.get("/person/:id", ContactController.getContactById)
router.post("/new", ContactController.createContact)
router.put("/person/:id", ContactController.updateContact)
router.delete("/person/:id", ContactController.deleteContact)
router.post("/person/:id/label", ContactController.addLabelToContact)
router.delete("/person/:id/label", ContactController.removeLabelFromContact)

module.exports = router