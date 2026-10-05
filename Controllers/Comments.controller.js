// Controllers/Comments.controller.js
import {
  createCommentService,
  getCommentsByIssueService,
  getCommentByIdService,
  updateCommentService,
  deleteCommentService,
} from '../Services/Comments.service.js';

export const createCommentController = async (req, res) => {
  try {
    const userId = req.user.id;
    const comment = await createCommentService(userId, req.body);

    req.log.info({ userId, commentId: comment.id }, 'Comment created');
    res.status(201).json(comment);
  } catch (error) {
    req.log.error({ err: error }, 'Create comment failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getCommentsByIssueController = async (req, res) => {
  try {
    const { issueId } = req.params;
    const comments = await getCommentsByIssueService(issueId);

    req.log.info({ issueId }, 'Comments fetched');
    res.status(200).json(comments);
  } catch (error) {
    req.log.error({ err: error }, 'Fetch comments failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getCommentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await getCommentByIdService(id);

    req.log.info({ commentId: id }, 'Comment fetched');
    res.status(200).json(comment);
  } catch (error) {
    req.log.error({ err: error }, 'Fetch comment failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const updateCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user;
    const comment = await updateCommentService(id, userId, role, req.body);

    req.log.info({ commentId: id }, 'Comment updated');
    res.status(200).json(comment);
  } catch (error) {
    req.log.error({ err: error }, 'Update comment failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user;
    const result = await deleteCommentService(id, userId, role);

    req.log.info({ commentId: id }, 'Comment deleted');
    res.status(200).json(result);
  } catch (error) {
    req.log.error({ err: error }, 'Delete comment failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};