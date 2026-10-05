import {
  createIssuesService,
  getIssuesCreatedByService,
  getIssuesAssignedService,
  getAllIssuesService,
  updateIssuesService,
  deleteIssuesService,
  getIssuesByIdService,
  getIssuesByTitleService,
} from '../Services/Issues.service.js';

/* ---------------- CREATE ---------------- */
export const createIssuesController = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const issue = await createIssuesService(req.body, userId, role);
    req.log.info({ userId, issueId: issue.id }, 'Issue created');
    res.status(201).json(issue);
  } catch (error) {
    req.log.error({ err: error }, 'Create issue failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/* ---------------- LIST (paginated) ---------------- */
const parseListQuery = (req) => ({
  limit:  Math.min(Number(req.query.limit)  || 20, 100),
  offset: Number(req.query.offset) || 0,
  status:   req.query.status,     // optional
  priority: req.query.priority,   // optional
  assigned_to: req.query.assigned_to,
});

export const getIssuesCreatedByController = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const { rows, count } = await getIssuesCreatedByService(userId, parseListQuery(req));
    req.log.info({ userId }, 'Issues by created user fetched');
    res.status(200).json({ count, results: rows });
  } catch (error) {
    req.log.error({ err: error }, 'Fetch created issues failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getIssuesAssignedController = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const { rows, count } = await getIssuesAssignedService(userId, parseListQuery(req));
    req.log.info({ userId }, 'Issues by assigned user fetched');
    res.status(200).json({ count, results: rows });
  } catch (error) {
    req.log.error({ err: error }, 'Fetch assigned issues failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getAllIssuesController = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin only' });
    }
    const { rows, count } = await getAllIssuesService(parseListQuery(req));
    res.status(200).json({ count, results: rows });
  } catch (error) {
    req.log.error({ err: error }, 'Fetch all issues failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/* ---------------- READ ONE ---------------- */
export const getIssuesByIdController = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { id: userId, role } = req.user;

    if (!issueId) {
      return res.status(400).json({ message: 'Issue id is required' });
    }

    const issue = await getIssuesByIdService(issueId, userId, role);
    req.log.info({ issueId }, 'Issue fetched');
    res.status(200).json(issue);
  } catch (error) {
    req.log.error({ err: error }, 'Fetch issue failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/* ---------------- UPDATE ---------------- */
export const updateIssuesController = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { id: userId, role } = req.user;

    if (!issueId) {
      return res.status(400).json({ message: 'Issue id is required' });
    }

    const issue = await updateIssuesService(issueId, req.body, userId, role);
    req.log.info({ issueId, userId }, 'Issue updated');
    res.status(200).json(issue);
  } catch (error) {
    req.log.error({ err: error }, 'Update issue failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/* ---------------- DELETE ---------------- */
export const deleteIssuesController = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { id: userId, role } = req.user;

    if (!issueId) {
      return res.status(400).json({ message: 'Issue id is required' });
    }

    const issue = await deleteIssuesService(issueId, userId, role);
    req.log.info({ issueId, userId }, 'Issue deleted');
    res.status(200).json({ message: 'Issue deleted', issue });
  } catch (error) {
    req.log.error({ err: error }, 'Delete issue failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/* ---------------- SEARCH ---------------- */
export const getIssuesByTitleController = async (req, res) => {
  try {
    const { title } = req.query;
    const { id: userId, role } = req.user;

    if (!title) {
      return res.status(400).json({ message: 'Issue title is required' });
    }

    const { rows, count } = await getIssuesByTitleService(title, userId, role, parseListQuery(req));
    req.log.info({ userId, title }, 'Issues by title fetched');
    res.status(200).json({ count, results: rows });
  } catch (error) {
    req.log.error({ err: error }, 'Fetch by title failed');
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};