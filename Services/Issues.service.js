import {
  createIssuesRepository,
  getIssuesByUserIdRepository,
  getIssuesAssignedToRepository,
  getAllIssuesRepository,
  updateIssuesRepository,
  deleteIssuesRepository,
  getIssuesByIdForUserRepository,
  getIssuesByTitleRepository,
} from '../Repositories/Issues.repository.js';
import { getUserByIdRepository } from '../Repositories/User.repository.js';

/* ---------------- CREATE ---------------- */
export const createIssuesService = async (data, created_by, role) => {
  const { title, description, status, priority, assigned_to, due_date } = data;

  if (!title || !title.trim()) {
    const err = new Error('Title is required'); err.statusCode = 400; throw err;
  }

  // Creator must exist (belt + braces — the JWT already guarantees this)
  const creator = await getUserByIdRepository(created_by);
  if (!creator) {
    const err = new Error('Creating user not found'); err.statusCode = 400; throw err;
  }

  // Non-admins may only assign to themselves, or leave unassigned
  let finalAssignee = assigned_to || null;
  if (finalAssignee && role !== 'admin' && finalAssignee !== created_by) {
    const err = new Error('Only admins can assign issues to other users');
    err.statusCode = 403; throw err;
  }

  // If assigning, verify the target user exists
  if (finalAssignee) {
    const assignedUser = await getUserByIdRepository(finalAssignee);
    if (!assignedUser) {
      const err = new Error('Assigned user not found'); err.statusCode = 400; throw err;
    }
  }

  return await createIssuesRepository({
    title: title.trim(),
    description: description?.trim() ?? null,
    status: status || 'open',
    priority: priority || 'medium',
    created_by,
    assigned_to: finalAssignee,
    due_date: due_date || null,
  });
};

/* ---------------- LIST ---------------- */
export const getIssuesCreatedByService = async (id, opts = {}) => {
  return await getIssuesByUserIdRepository(id, opts);
};

export const getIssuesAssignedService = async (id, opts = {}) => {
  return await getIssuesAssignedToRepository(id, opts);
};

export const getAllIssuesService = async (opts = {}) => {
  return await getAllIssuesRepository(opts);
};

/* ---------------- READ ONE ---------------- */
export const getIssuesByIdService = async (id, userId, role) => {
  const user = await getUserByIdRepository(userId);
  if (!user) { const e = new Error('User not found'); e.statusCode = 404; throw e; }

  const issue = await getIssuesByIdForUserRepository(id, userId, role);
  if (!issue) { const e = new Error('Issue not found'); e.statusCode = 404; throw e; }
  return issue;
};

/* ---------------- UPDATE ---------------- */
export const updateIssuesService = async (id, data, userId, role) => {
  const issue = await getIssuesByIdForUserRepository(id, userId, role);
  if (!issue) { const e = new Error('Issue not found'); e.statusCode = 404; throw e; }

  // Authorization
  const isAdmin    = role === 'admin';
  const isCreator  = issue.created_by === userId;
  const isAssignee = issue.assigned_to === userId;

  if (!isAdmin && !isCreator && !isAssignee) {
    const e = new Error('Not authorized to update this issue'); e.statusCode = 403; throw e;
  }

  // Field-level rules
  const patch = {};
  const { title, description, status, priority, assigned_to, due_date } = data;

  if (title !== undefined) {
    if (!isAdmin && !isCreator) {
      const e = new Error('Only the creator or an admin can edit the title'); e.statusCode = 403; throw e;
    }
    patch.title = title.trim();
  }

  if (description !== undefined) {
    if (!isAdmin && !isCreator) {
      const e = new Error('Only the creator or an admin can edit the description'); e.statusCode = 403; throw e;
    }
    patch.description = description?.trim() ?? null;
  }

  if (status !== undefined)   patch.status   = status;
  if (priority !== undefined) patch.priority = priority;
  if (due_date !== undefined) patch.due_date = due_date;

  if (assigned_to !== undefined) {
    // Only admins and the creator can reassign
    if (!isAdmin && !isCreator) {
      const e = new Error('Only the creator or an admin can reassign this issue'); e.statusCode = 403; throw e;
    }
    if (assigned_to) {
      const target = await getUserByIdRepository(assigned_to);
      if (!target) { const e = new Error('Assigned user not found'); e.statusCode = 400; throw e; }
    }
    patch.assigned_to = assigned_to || null;
  }

  return await updateIssuesRepository(id, patch);
};

/* ---------------- DELETE ---------------- */
export const deleteIssuesService = async (id, actionBy, role) => {
  const user = await getUserByIdRepository(actionBy);
  if (!user) { const e = new Error('User not found'); e.statusCode = 404; throw e; }

  const issue = await getIssuesByIdForUserRepository(id, actionBy, role);
  if (!issue) { const e = new Error('Issue not found'); e.statusCode = 404; throw e; }

  const isAdmin   = role === 'admin';
  const isCreator = issue.created_by === actionBy;

  if (!isAdmin && !isCreator) {
    const e = new Error('Not authorized to delete this issue'); e.statusCode = 403; throw e;
  }

  return await deleteIssuesRepository(id);
};

/* ---------------- SEARCH ---------------- */
export const getIssuesByTitleService = async (title, userId, role, opts = {}) => {
  const user = await getUserByIdRepository(userId);
  if (!user) { const e = new Error('User not found'); e.statusCode = 404; throw e; }
  return await getIssuesByTitleRepository(title, userId, role, opts);
};