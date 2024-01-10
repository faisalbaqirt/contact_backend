const express = require("express")
const router = express.Router()
const ContactController = require('../controllers/contactController')
const isAuthenticated = require("../middleware/isAuthenticated")
const upload = require("../middleware/multer")

router.use(isAuthenticated)

router.get("/", ContactController.getAllContactList)
router.get("/person/:id", ContactController.getContactById)
router.get("/label/:label_name", ContactController.getContactByLabel)
router.post("/new", ContactController.createContact)
router.put("/person/:id", ContactController.updateContact)
router.put("/person/:id/photo", upload.single("photo"),ContactController.updateContactPhoto)
router.put("/person/:id/favorite", ContactController.updateContactFavorite)
router.delete("/person/:id", ContactController.deleteContact)
router.post("/person/:id/label", ContactController.addLabelToContact)
router.delete("/label", ContactController.removeLabelFromAllContact)
router.delete("/person/:id/label", ContactController.removeLabelFromContact)

module.exports = router