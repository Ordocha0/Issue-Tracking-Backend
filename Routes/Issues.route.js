import express from 'express';
import {
  createIssuesController,
  getIssuesCreatedByController,
  getIssuesAssignedController,
  getAllIssuesController,
  updateIssuesController,
  deleteIssuesController,
  getIssuesByIdController,
  getIssuesByTitleController,
} from '../Controllers/Issues.controller.js';
import { verifyToken } from '../Middleware/jwt_token_verification.js';

const router = express.Router();
router.use(verifyToken);

/* -------- static paths first (order matters) -------- */
router.get('/created',     getIssuesCreatedByController);
router.get('/assigned',    getIssuesAssignedController);
router.get('/all',         getAllIssuesController);
router.get('/title',       getIssuesByTitleController);

/* -------- parametrised paths after -------- */
router.post('/create',          createIssuesController);
router.get('/get/:issueId',     getIssuesByIdController);
router.put('/:issueId',         updateIssuesController);
router.delete('/:issueId',      deleteIssuesController);

/* -------- admin-scoped (list by user id) -------- */
router.get('/created/:userId',  getIssuesCreatedByController);
router.get('/assigned/:userId', getIssuesAssignedController);

export default router;