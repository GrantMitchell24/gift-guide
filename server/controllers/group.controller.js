const { Group } = require('../models');
const { addGroup } = require("./user.controller")

const Model = Group; 

async function getAllItems() {
  try {
    return await Model.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function getItemById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function createItem(data) {
  try {
    const newGroup = await Model.create(data);
    await addGroup(data.admin_id, newGroup._id)
    return newGroup
  } catch (err) {
    throw new Error(err)
  }
}

async function updateItemById(id, data) {
  try {
    return await Model.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteItemById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllGroups: getAllItems,
  getGroupById: getItemById,
  createGroup: createItem,
  updateGroupById: updateItemById,
  deleteGroupById: deleteItemById
}