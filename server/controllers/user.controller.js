const { User, Item } = require('../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const Model = User; 

  async function verifyUser(req){
    const cookie = req.cookies["auth-cookie"]
    if( !cookie ) return false 

    const isVerified = jwt.verify(cookie, process.env.JWT_SECRET)
    if( !isVerified ) return false 

    const user = await Model.findOne({ _id: isVerified.id })
    if( !user ) return false 

    return user
}


async function authenticate(data){
  let user 

  try {
    user = await Model.findOne({ email: data.email })
  } catch(err) {
    console.log(err)
    throw new Error(err)
  }

  if(!user) throw new Error("No user found")

  let userIsOk = false
  try {
    userIsOk = await bcrypt.compare( data.password, user.password )
  } catch(err){
    console.log(err)
    throw new Error(err)
  }

  if(!userIsOk) throw new Error("Could not login")
  return user;
}


async function getAllItems() {
  try {
    return await Model.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function addGroup(userId, groupId){
  const user = await getItemById(userId)
  const updatedGroups = [...user.groups, groupId]
  const updatedUser = await updateItemById(user, { groups: updatedGroups }, { new: true})
  return updatedUser
}

async function addGroupsToUser(arrOfUsers, groupId){
  await arrOfUsers.map( async user => await addGroup(user._id, groupId ))
}



async function getItemById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

// use this as our signup handler
async function createItem(data) {
  try {
    return await Model.create(data);
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
  getAllUsers: getAllItems,
  getUserById: getItemById,
  createUser: createItem,
  updateUserById: updateItemById,
  deleteUserById: deleteItemById,
  authenticate,
  verifyUser,
  addGroup
}
