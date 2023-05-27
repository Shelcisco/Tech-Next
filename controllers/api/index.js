
const blogRoutes = require ("./blogRoutes");
const commentRoutes = require ("./commentRoutes");
const userRoutes = require ("./userRoutes");

const router = require ("express").Router();

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);

module.exports=router;