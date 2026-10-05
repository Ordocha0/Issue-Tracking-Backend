// Repositories/Comments.repository.js
import { Comments, User } from '../Models/index.js';

export const createCommentRepository = async (data) => {
  try {
    const comment = await Comments.create(data);
    return comment.get({ plain: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCommentsByIssueRepository = async (issueId) => {
  try {
    const comments = await Comments.findAll({
      where: { issue_id: issueId },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'first_name', 'last_name', 'email', 'role'],
        },
      ],
      order: [['created_at', 'ASC']],
    });
    return comments.map((c) => c.get({ plain: true }));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCommentByIdRepository = async (id) => {
  try {
    const comment = await Comments.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'first_name', 'last_name', 'email', 'role'],
        },
      ],
    });
    if (!comment) return null;
    return comment.get({ plain: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCommentRepository = async (id, data) => {
  try {
    const comment = await Comments.findByPk(id);
    if (!comment) return null;
    await comment.update({ ...data, updated_at: new Date() });
    return comment.get({ plain: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCommentRepository = async (id) => {
  try {
    const comment = await Comments.findByPk(id);
    if (!comment) return null;
    await comment.destroy(); // paranoid -> soft delete
    return comment.get({ plain: true });
  } catch (error) {
    throw new Error(error.message);
  }
};