const { Group } = require('../models');
const { addGroupToUser, deleteGroupFromUser } = require("./user.controller")

const Model = Group;

async function getAllGroups() {
  try {
    return await Model.find().populate({path: "admin_id", select: "_id email name username"}).populate({path: "group_members", select: "_id email name username"});
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllGroupsByAdmin(userId) {
  try {
    return await Model.find({admin_id: userId}).populate({path: "admin_id", select: "_id email name username"}).populate({path: "group_members", select: "_id email name username"});
  } catch (err) {
    throw new Error(err)
  }
}

async function getGroupById(id) {
  try {
    return await Model.findById(id)
      .populate({path: "admin_id", select: "_id email name username"}).populate({path: "group_members", select: "_id email name username"});
  } catch (err) {
    throw new Error(err)
  }
}



// Create a Group
// User id passed in should be passed in as the admin_id since they're the creator
// Calls the function so that it also adds the group into the admin user's groups array
async function createGroup(data) {
  try {
    const newGroup = await Model.create(data);
    await addGroupToUser(data.admin_id, newGroup._id)
    return newGroup
  } catch (err) {
    throw new Error(err)
  }
}

// Add user to group (and add Group to User via user.Controller)
async function addUserToGroup(groupId, userId) {
  try {
    const payload = await Model.findByIdAndUpdate(
      { _id: groupId },
      { $addToSet: { group_members: userId } },
      { runValidators: true, new: true }
    )
    await addGroupToUser(userId, groupId)
    return payload
  } catch (err) {
    throw new Error(err)
  }
}

// Delete user from group (and delete Group from User via user.Controller)
async function deleteUserFromGroup(groupId, userId) {
  try {
    const payload = await Model.findByIdAndUpdate(
      { _id: groupId },
      { $pull: { group_members: userId } },
      { runValidators: true, new: true }
    )
    await deleteGroupFromUser(userId, groupId)
    return payload
  } catch (err) {
    throw new Error(err)
  }
}


async function updateGroupById(id, data) {
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

// First finds the group by id
// Next cycles through all the group members and removes the group id from each user's group array
// Then removes the group from the admin's group array
// Then deletes the group
async function deleteGroupById(groupId) {
  try {
    const group = await getGroupById(groupId);
    // cycles through all the userId's in group_members and removes the group from that user's groups list
    group.group_members.forEach( async (userId) => await deleteGroupFromUser(userId, groupId))
    // removes the group from the admin's list
    await deleteGroupFromUser(group.admin_id, groupId)
    await Model.findByIdAndDelete(groupId);
    return "Group Deleted";
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllGroups,
  getAllGroupsByAdmin,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
  addUserToGroup,
  deleteUserFromGroup
}