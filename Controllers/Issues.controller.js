import {
  createIssuesService,
  getIssuesCreatedByService,
  getIssuesAssignedService,
  updateIssuesService,
  deleteIssuesService,
  getIssuesByIdService,
  getIssuesByTitleService
} from '../Services/Issues.service.js';
import {generateJWTToken} from '../Utils/jwt.js';


export const createIssuesController = async (req, res) => {
  try {
    const user = await createIssuesService(req.body);

    req.log.info({ issueId: req.params.id }, 'Issue created');
    res.status(201).json(user);

  } catch (error) {
    req.log.error({ err: error })
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getIssuesCreatedByController = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const issues = await getIssuesCreatedByService(userId);

    req.log.info({ issueId: req.params.id }, 'Issues by created user fetched');
    res.status(201).json(issues);

  } catch (error) {
    req.log.error({ err: error })
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getIssuesAssignedController = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const issues = await getIssuesAssignedService(userId);

    req.log.info({ issueId: req.params.id }, 'Issues by assigned user fetched');
    res.status(201).json(issues);

  } catch (error) {
    req.log.error({ err: error })
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const updateIssuesController = async (req, res) => {
  try {
    const issueId = req.params.issueId;
    // verify params is passed 
    if(!issueId){
      const err =  new Error('Issue id is required');
      err.statusCode = 400;
      throw err;
    }
    const issues = await updateIssuesService(issueId, req.body);

    req.log.info({ issueId: req.params.id }, 'Issues updated');
    res.status(201).json(issues);

  } catch (error) {
    req.log.error({ err: error })
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteIssuesController = async (req, res) => {
  try {
    const issueId = req.params.issueId;
    const userId = req.user.id;
    // verify params is passed 
    if(!issueId){
      const err =  new Error('Issue id is required');
      err.statusCode = 400;
      throw err;
    }

    const issues = await deleteIssuesService(issueId , userId);

    req.log.info({ issueId: req.params.id }, 'Issues deleted');
    res.status(201).json(issues);

  } catch (error) {
    req.log.error({ err: error })
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getIssuesByIdController = async (req, res) => {
  try {
    const issueId = req.params.issueId;
    const userId = req.user.id;
    // verify params is passed 
    if(!issueId){
      const err =  new Error('Issue id is required');
      err.statusCode = 400;
      throw err;
    }

    const issues = await getIssuesByIdService(issueId , userId);

    req.log.info({ issueId: req.params.id }, 'Issues by id fetched');
    res.status(201).json(issues);

  } catch (error) {
    req.log.error({ err: error })
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getIssuesByTitleController = async (req, res) => {
  try {
    const title = req.params.title;
    const userId = req.user.id;
    // verify params is passed 
    if(!title){
      const err =  new Error('Issue title is required');
      err.statusCode = 400;
      throw err;
    }

    const issues = await getIssuesByTitleService(title , userId);

    req.log.info({ issueId: req.params.id }, 'Issues by title fetched');
    res.status(201).json(issues);

  } catch (error) {
    req.log.error({ err: error })
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
