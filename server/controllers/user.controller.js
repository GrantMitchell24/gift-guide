const { User } = require('../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();


const Model = User;

// DONE -> Provided By Gary
async function verifyUser(req) {
  const cookie = req.cookies["auth-cookie"]
  if (!cookie) return false

  const isVerified = jwt.verify(cookie, process.env.JWT_SECRET)
  if (!isVerified) return false

  const user = await Model.findOne({ _id: isVerified.id })
  if (!user) return false

  return user
}


// DONE -> Provided By Gary
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


// DONE
async function getAllUsers() {
  try {
    return await Model.find().populate({ path: "groups", select: "_id title" });
  } catch (err) {
    throw new Error(err)
  }
}


// DONE
async function getUserById(id) {
  try {
    return await Model.findById(id).populate({ path: "groups", select: "_id title" });
  } catch (err) {
    throw new Error(err)
  }
}

// DONE
// use this as our signup handler
async function createUser(data) {
  try {
    return await Model.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

// DONE
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


// DONE
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

// DONE
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

// DONE
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


// DONE
async function addPendingGroupToUser(userId, groupId) {
  try {
    const payload = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { pending_groups: groupId } },
      { runValidators: true, new: true }
    )
    return payload
  } catch (err) {
    throw new Error(err)
  }
}


// DONE
async function deletePendingGroupFromUser(userId, groupId) {
  try {
    const payload = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { pending_groups: groupId } },
      { runValidators: true, new: true }
    )
    return payload
  } catch (err) {
    throw new Error(err)
  }
}


// DONE
// Used to add group creator directly to a group, bypassing pending_group
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

// DONE
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
  verifyUser,
  authenticate,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,

  createUserItem,
  updateUserItem,
  deleteUserItem,

  addPendingGroupToUser,
  deletePendingGroupFromUser,
  addGroupToUser,
  deleteGroupFromUser
}
