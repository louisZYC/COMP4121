const models = require("../models");
const Transaction = models.transaction;

// Create a new product
exports.create = async (req, res) => {
  if (
    !req.body.details ||
    !req.body.deliverTo ||
    !req.body.contact,
    !req.body.totalAmount
  ) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const transaction = {
    details: req.body.details,
    deliverTo: req.body.deliverTo,
    contact: req.body.contact,
    totalAmount: req.body.totalAmount
  };

  try {
    const data = await Transaction.create(transaction);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

// Create multiple transactions
exports.bulkCreate = async (req, res) => {
  if (!req.body.transactions) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  try {
    const data = await Transaction.bulkCreate(req.body.transactions);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
}

// Delete a transaction with the id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Transaction.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Transaction was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Transaction with id=${id}. Maybe product was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Transaction with id=" + id,
    });
  }
};

// Update a Transaction info with the id
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Transaction.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Product was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update product with id=${id}. Maybe product was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating product with id=" + id,
    });
  }
};

// Retrieve all the Transaction data
exports.findAll = async (req, res) => {
  try {
    const data = await Transaction.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

// Get info of one product with the id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Transaction.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving product with id=" + id,
    });
  }
};