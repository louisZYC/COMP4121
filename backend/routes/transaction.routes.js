const express = require('express');
const router = express.Router();

const transactions = require("../controllers/transaction.controller.js");

router.post("/", transactions.create);
 
router.post("/bulk", transactions.bulkCreate);

router.put("/:id", transactions.update);

router.delete("/:id", transactions.delete);

router.get("/", transactions.findAll);

router.get("/:id", transactions.findOne);

module.exports = router;