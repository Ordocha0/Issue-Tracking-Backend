// Routes/Comments.route.js
import express from 'express';
import {
  createCommentController,
  getCommentsByIssueController,
  getCommentByIdController,
  updateCommentController,
  deleteCommentController,
} from '../Controllers/Comments.controller.js';
import { verifyToken } from '../Middleware/jwt_token_verification.js';

const router = express.Router();

/* -------------------------------------------------
   Mounted at /comments  (see server file below)

   POST   /comments                    -> create
   GET    /comments/issue/:issueId     -> list for an issue
   GET    /comments/:id                -> get one
   PUT    /comments/:id                -> update
   DELETE /comments/:id                -> delete
--------------------------------------------------*/

router.post('/', verifyToken, createCommentController);
router.get('/issue/:issueId', verifyToken, getCommentsByIssueController);
router.get('/:id', verifyToken, getCommentByIdController);
router.put('/:id', verifyToken, updateCommentController);
router.delete('/:id', verifyToken, deleteCommentController);

export default router;