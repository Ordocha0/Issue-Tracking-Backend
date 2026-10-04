import express from "express";
import {
  createIssuesController,
  getIssuesCreatedByController,
  getIssuesAssignedController,
  updateIssuesController,
  deleteIssuesController,
  getIssuesByIdController,
  getIssuesByTitleController
} from "../Controllers/Issues.controller.js";

const router = express.Router();
import {verifyToken} from "../Middleware/jwt_token_verification.js";

// router.use(verifyToken);

router.post("/create", verifyToken, createIssuesController);
router.get("/created/{:userId}", verifyToken, getIssuesCreatedByController);
router.get("/assigned/{:userId}", verifyToken, getIssuesAssignedController);
router.put("/:issueId", verifyToken, updateIssuesController);
router.delete("/:issueId", verifyToken, deleteIssuesController);
router.get("/get/:issueId", verifyToken, getIssuesByIdController);
router.get("/title/:title", verifyToken, getIssuesByTitleController);


export default router;