// const router = require('express').Router();

// // Import any controllers needed here
// const { getAllItems, getItemById, createItem, updateItemById, deleteItemById } = require('../../controllers/item.controller');

// // Declare the routes that point to the controllers above
// router.get("/", async (req, res) => {
//   try {
//     const payload = await getAllItems()
//     res.status(200).json({ result: "success", payload })
//   } catch(err){
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

// router.get("/:id", async (req, res) => {
//   try {
//     const payload = await getItemById(req.params.id)
//     res.status(200).json({ result: "success", payload })
//   } catch(err){
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

// router.post("/", async (req, res) => {
//   try {
//     const payload = await createItem(req.body)
//     res.status(200).json({ result: "success", payload })
//   } catch(err){
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

// router.put("/:id", async (req, res) => {
//   try {
//     const payload = await updateItemById(req.params.id, req.body)
//     res.status(200).json({ result: "success", payload })
//   } catch(err){
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

// router.delete("/:id", async (req, res) => {
//   try {
//     const payload = await deleteItemById(req.params.id)
//     res.status(200).json({ result: "success", payload })
//   } catch(err){
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

// module.exports = router;
