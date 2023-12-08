const router = require('express').Router();

// Import any controllers needed here
const { 
  getAllGroups, 
  getAllGroupsByAdmin,
  getGroupById, 
  createGroup, 
  updateGroupById, 
  deleteGroupById,
  addUserToGroup ,
  deleteUserFromGroup
} = require('../../controllers/group.controller');

// Declare the routes that point to the controllers above
router.get("/", async (req, res) => {
  try {
    const payload = await getAllGroups()
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// Get all groups by adminId
router.get("/admin/:id", async (req, res) => {
  try {
    const payload = await getAllGroups()
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const payload = await getGroupById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await createGroup(req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.put("/:groupId/:userId", async (req, res) => {
  try {
    const payload = await addUserToGroup(req.params.groupId, req.params.userId)
    res.status(200).json({ result: "User added to group", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:groupId/:userId", async (req, res) => {
  try {
    const payload = await deleteUserFromGroup(req.params.groupId, req.params.userId)
    res.status(200).json({ result: "User deleted from group", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const payload = await updateGroupById(req.params.id, req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteGroupById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;
