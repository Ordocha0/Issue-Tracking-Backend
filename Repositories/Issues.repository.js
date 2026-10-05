import { Issues, User } from '../Models/index.js';
import { Op } from 'sequelize';

// Include creator + assignee in responses (matches what the frontend wants)
const USER_ATTRS = ['id', 'first_name', 'last_name', 'email', 'role'];
const INCLUDE_USERS = [
  { model: User, as: 'creator',  attributes: USER_ATTRS },
  { model: User, as: 'assignee', attributes: USER_ATTRS },
];

/* ---------------- CREATE ---------------- */
export const createIssuesRepository = async (data) => {
  try {
    const issue = await Issues.create(data);
    // Re-fetch so associations are populated
    return await getIssuesByIdForUserRepository(issue.id, data.created_by, 'admin');
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ---------------- LIST: CREATED BY USER (paginated) ---------------- */
export const getIssuesByUserIdRepository = async (userId, { limit = 20, offset = 0, status, priority } = {}) => {
  try {
    const where = { created_by: userId };
    if (status)   where.status   = status;
    if (priority) where.priority = priority;

    const { rows, count } = await Issues.findAndCountAll({
      where,
      include: INCLUDE_USERS,
      order: [['created_at', 'DESC']],
      limit,
      offset,
    });
    return { rows: rows.map((r) => r.get({ plain: true })), count };
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ---------------- LIST: ASSIGNED TO USER (paginated) ---------------- */
export const getIssuesAssignedToRepository = async (userId, { limit = 20, offset = 0, status, priority } = {}) => {
  try {
    const where = { assigned_to: userId };
    if (status)   where.status   = status;
    if (priority) where.priority = priority;

    const { rows, count } = await Issues.findAndCountAll({
      where,
      include: INCLUDE_USERS,
      order: [['created_at', 'DESC']],
      limit,
      offset,
    });
    return { rows: rows.map((r) => r.get({ plain: true })), count };
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ---------------- LIST: ALL (admin only) ---------------- */
export const getAllIssuesRepository = async ({ limit = 20, offset = 0, status, priority, assigned_to } = {}) => {
  try {
    const where = {};
    if (status)      where.status      = status;
    if (priority)    where.priority    = priority;
    if (assigned_to) where.assigned_to = assigned_to;

    const { rows, count } = await Issues.findAndCountAll({
      where,
      include: INCLUDE_USERS,
      order: [['created_at', 'DESC']],
      limit,
      offset,
    });
    return { rows: rows.map((r) => r.get({ plain: true })), count };
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ---------------- READ ONE with auth-aware inclusion ---------------- */
export const getIssuesByIdForUserRepository = async (id, userId, role) => {
  try {
    const where = { id };
    if (role !== 'admin') {
      where[Op.or] = [{ created_by: userId }, { assigned_to: userId }];
    }

    const issue = await Issues.findOne({ where, include: INCLUDE_USERS });
    return issue ? issue.get({ plain: true }) : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ---------------- UPDATE (anyone authorized) ---------------- */
export const updateIssuesRepository = async (id, data) => {
  try {
    const issue = await Issues.findByPk(id);
    if (!issue) return null;

    // Only allow known fields; drop undefined so partial updates work
    const allowed = ['title', 'description', 'status', 'priority', 'assigned_to', 'due_date'];
    const patch = {};
    allowed.forEach((k) => {
      if (data[k] !== undefined) patch[k] = data[k];
    });
    patch.updated_at = new Date();

    await issue.update(patch);

    return await getIssuesByIdForUserRepository(id, issue.created_by, 'admin');
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ---------------- DELETE ---------------- */
export const deleteIssuesRepository = async (id) => {
  try {
    const issue = await Issues.findByPk(id);
    if (!issue) return null;
    await issue.destroy(); // paranoid → soft delete
    return issue.get({ plain: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ---------------- SEARCH BY TITLE (findAll, paginated) ---------------- */
export const getIssuesByTitleRepository = async (title, userId, role, { limit = 20, offset = 0 } = {}) => {
  try {
    const where = { title: { [Op.iLike]: `%${title}%` } };
    if (role !== 'admin') {
      where[Op.or] = [{ created_by: userId }, { assigned_to: userId }];
    }

    const { rows, count } = await Issues.findAndCountAll({
      where,
      include: INCLUDE_USERS,
      order: [['created_at', 'DESC']],
      limit,
      offset,
    });
    return { rows: rows.map((r) => r.get({ plain: true })), count };
  } catch (error) {
    throw new Error(error.message);
  }
};