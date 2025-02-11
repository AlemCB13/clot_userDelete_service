const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controllers/userController");

// Ruta para eliminar usuario
router.delete("/:id", deleteUser);

module.exports = router;
