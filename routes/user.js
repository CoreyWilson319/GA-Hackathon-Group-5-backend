import { Router } from "express"
// restrictions
// import from controllers

const router = Router()

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.get("/verify", verify)
router.get("/users", getUsers)
router.get("/users/:id", getUser)
router.put("/users/:id", restrict, updateUser)


export default router