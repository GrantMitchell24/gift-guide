const { User } = require('../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const Model = User;

async function verifyUser(req) {
  const cookie = req.cookies["auth-cookie"]
  if (!cookie) return false

  const isVerified = jwt.verify(cookie, process.env.JWT_SECRET)
  if (!isVerified) return false

  const user = await Model.findOne({ _id: isVerified.id })
  if (!user) return false

  return user
}


async function authenticate(data) {
  let user

  try {
    user = await Model.findOne({ email: data.email })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }

  if (!user) throw new Error("No user found")

  let userIsOk = false
  try {
    userIsOk = await bcrypt.compare(data.password, user.password)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }

  if (!userIsOk) throw new Error("Could not login")
  return user;
}


async function getAllUsers() {
  try {
    return await Model.find();
  } catch (err) {
    throw new Error(err)
  }
}


async function getUserById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

// use this as our signup handler
async function createUser(data) {
  try {
    return await Model.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

async function updateUserById(id, data) {
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


//------------------------------------------------
// In works
// When deleting user
// 1) Remove user Id from all the groups they are in
// 2) Delete all groups where they are the admin
// 3) Delete user
//------------------------------------------------
async function deleteUserById(userId) {
  try {
    // const user = await getUserById(userId)
    // await user.groups.forEach( async (groupId) => await deleteUserFromGroup(groupId, userId))

    await Model.findByIdAndDelete(userId);
    return "User Deleted"
  } catch (err) {
    throw new Error(err)
  }
}

// OG Delete User
// async function deleteItemById(id) {
//   try {
//     return await Model.findByIdAndDelete(id);
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// Create an Item in the User's Item subdocument
async function createUserItem(id, itemInfo) {
  try {
    const item = await User.findOneAndUpdate(
      { _id: id },
      { $addToSet: { items: itemInfo } },
      { runValidators: true, new: true }
    )
    return item
  } catch (err) {
    throw new Error(err)
  }

}

// Update an Item in the User's Item subdocument
async function updateUserItem(userId, itemId, itemInfo) {
  try {
    const payload = await User.findOneAndUpdate(
      {
        '_id': userId,
        'items._id': itemId
      },
      {
        $set: {
          'items.$.name': itemInfo.name,
          'items.$.wishRank': itemInfo.wishRank,
          'items.$.cost': itemInfo.cost,
          'items.$.notes': itemInfo.notes,
          'items.$.purchased': itemInfo.purchased,
          'items.$.link': itemInfo.link,
        }
      },
      { runValidators: true, new: true }
    )
    return payload
  } catch (err) {
    throw new Error(err)
  }
}

// Delete an Item in the User's Item subdocument
async function deleteUserItem(userId, itemId) {
  try {
    const payload = await User.findOneAndUpdate(
      { '_id': userId, },
      { $pull: { items: { '_id': itemId } } },
      { new: true }
    )
    return payload
  } catch (err) {
    throw new Error(err)
  }
}

// ------------------------------------------------------
// Idea from Gary
// ------------------------------------------------------
// async function addGroupToUser(userId, groupId){
//   const user = await getUserById(userId)
//   const updatedGroups = [...user.groups, groupId]
//   const updatedUser = await updateItemById(user, { groups: updatedGroups }, { new: true})
//   return updatedUser
// }

// async function addGroupsToUser(arrOfUsers, groupId){
//   await arrOfUsers.map( async user => await addGroup(user._id, groupId ))
// }
// ------------------------------------------------------
// ------------------------------------------------------

async function addGroupToUser(userId, groupId) {
  try {
    const payload = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { groups: groupId } },
      { runValidators: true, new: true }
    )
    return payload
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteGroupFromUser(userId, groupId) {
  try {
    const payload = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { groups: groupId } },
      { runValidators: true, new: true }
    )
    return payload
  } catch (err) {
    throw new Error(err)
  }
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  authenticate,
  verifyUser,
  createUserItem,
  updateUserItem,
  deleteUserItem,
  addGroupToUser,
  deleteGroupFromUser,
}
