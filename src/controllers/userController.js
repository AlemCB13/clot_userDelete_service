const { deleteUserDB } = require("../models/userModel");

class DeleteUserProxy {
  constructor(userId) {
    this.userId = userId;
  }

  async execute() {
    console.log(`Validating request to delete user ID: ${this.userId}`);

    // Aquí podríamos agregar validaciones adicionales antes de eliminar
    if (!this.userId || isNaN(this.userId)) {
      throw new Error("Invalid user ID");
    }

    return await deleteUserDB(this.userId);
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const proxy = new DeleteUserProxy(id);
    const result = await proxy.execute();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = { deleteUser };
