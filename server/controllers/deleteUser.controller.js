// Calls functions from both the user.controller and the group.controller
// This needs functions from the group.controller that reference the user.controller so this function couldn't stay in the user.controller because requiring the group.controller into the user.controller, which required the user.controller was throwing errors

const { User } = require('../models');
const { deleteUserFromGroup, getAllGroupsByAdmin, deleteGroupById, deletePendingUserFromGroup } = require('./group.controller');
const { getUserById } = require('./user.controller');

async function deleteUserById(userId) {
  try {
    // Find user
    const user = await getUserById(userId)

    // // Find all groups the user is pending for and remove their id from the group's pending_group_members array
    await user.pending_groups.forEach(async (groupId) =>
      await deletePendingUserFromGroup(groupId, userId)
    )

    // // Find all groups the user is in and remove their id from the group's group_members array
    await user.groups.forEach(async (group) => {
      await deleteUserFromGroup(group._id, userId)
    })

    // Find all groups the user is an admin for
    const adminGroups = await getAllGroupsByAdmin(userId)

    // Delete all groups the user is an admin off
    adminGroups.forEach(async (groupId) => {
      await deleteGroupById(groupId._id)
    })

    // Delete User
    await User.findByIdAndDelete(userId);

    return "User deleted"
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  deleteUserById
}