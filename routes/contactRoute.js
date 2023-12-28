const express = require("express")
const router = express.Router()
const ContactController = require('../controllers/contactController')
const isAuthenticated = require("../middleware/isAuthenticated")

router.use(isAuthenticated)

router.get("/", ContactController.getAllContactList)
router.post("/", ContactController.createContact)
router.put("/:id", ContactController.updateContact)
router.delete("/:id", ContactController.deleteContact)

module.exports = router