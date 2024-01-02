const express = require("express")
const router = express.Router()
const LabelController = require("../controllers/labelController")
const isAuthenticated = require("../middleware/isAuthenticated")

router.use(isAuthenticated)

router.get("/", LabelController.getAllLabels)
router.post("/", LabelController.createLabel)
router.delete("/:id", LabelController.deleteLabel)

module.exports = router