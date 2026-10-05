// Services/Comments.service.js
import {
  createCommentRepository,
  getCommentsByIssueRepository,
  getCommentByIdRepository,
  updateCommentRepository,
  deleteCommentRepository,
} from '../Repositories/Comments.repository.js';

import { getUserByIdRepository } from '../Repositories/User.repository.js';

export const createCommentService = async (userId, data) => {
  const { issue_id, body } = data;

  if (!issue_id) {
    const err = new Error('issue_id is required');
    err.statusCode = 400;
    throw err;
  }
  if (!body || !body.trim()) {
    const err = new Error('Comment body cannot be empty');
    err.statusCode = 400;
    throw err;
  }

  const user = await getUserByIdRepository(userId);
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  const comment = await createCommentRepository({
    issue_id,
    user_id: userId,
    body: body.trim(),
  });

  return comment;
};

export const getCommentsByIssueService = async (issueId) => {
  return await getCommentsByIssueRepository(issueId);
};

export const getCommentByIdService = async (id) => {
  const comment = await getCommentByIdRepository(id);
  if (!comment) {
    const err = new Error('Comment not found');
    err.statusCode = 404;
    throw err;
  }
  return comment;
};

export const updateCommentService = async (id, userId, role, data) => {
  const comment = await getCommentByIdRepository(id);
  if (!comment) {
    const err = new Error('Comment not found');
    err.statusCode = 404;
    throw err;
  }

  // Only the author or an admin may edit
  if (comment.user_id !== userId && role !== 'admin') {
    const err = new Error('Not authorized to edit this comment');
    err.statusCode = 403;
    throw err;
  }

  const updated = await updateCommentRepository(id, { body: data.body?.trim() });
  return updated;
};

export const deleteCommentService = async (id, userId, role) => {
  const comment = await getCommentByIdRepository(id);
  if (!comment) {
    const err = new Error('Comment not found');
    err.statusCode = 404;
    throw err;
  }

  if (comment.user_id !== userId && role !== 'admin') {
    const err = new Error('Not authorized to delete this comment');
    err.statusCode = 403;
    throw err;
  }

  await deleteCommentRepository(id);
  return { message: 'Comment deleted successfully' };
};