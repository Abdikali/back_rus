const express = require('express');
const router = express.Router();
const controller = require("../controllers/student.controller");

router.route("/")
.get(controller.students)
.post(controller.create)
.put((req, res) => res.status(405).send())
.delete(controller.deleteAll)

router.route("/:id")
.get(controller.student)
.post((req, res) => res.status(405).send())
.put(controller.update)
.delete(controller.delete);

module.exports = router;
