// const { Item } = require('../models');
// const Model = Item; 

// async function getAllItems() {
//   try {
//     return await Model.find();
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// async function getItemById(id) {
//   try {
//     return await Model.findById(id);
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// async function createItem(data) {
//   try {
//     return await Model.create(data);
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// async function updateItemById(id, data) {
//   try {
//     return await Model.findByIdAndUpdate(
//       id,
//       data,
//       { new: true }
//     );
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// async function deleteItemById(id) {
//   try {
//     return await Model.findByIdAndDelete(id);
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// module.exports = {
//   getAllItems,
//   getItemById,
//   createItem,
//   updateItemById,
//   deleteItemById
// }
