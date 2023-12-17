const db = require("./models/index.js")

module.exports = { getBills, createBill }

async function getBills() {
    const bills = await db.sequelize.models.Bills.findAll();

    return bills
}

async function createBill(userId, numberOfItems, totalAmount) {
    await db.sequelize.models.Bills.create({ user_id: userId, number_of_items: numberOfItems, total_amount: totalAmount })
}