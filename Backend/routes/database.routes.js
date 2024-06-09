const express = require('express')
const {getAlltasks,getOnetask,createTask,updatetask,deletetask} = require("../controllers/database.controllers.js")
const router = express.Router()


router.route("/").get(getAlltasks).post(createTask)
router.route("/:id").get(getOnetask).put(updatetask).delete(deletetask)

module.exports = router