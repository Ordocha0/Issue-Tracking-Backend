// import {
//   createIssuesRepository
// } from '../Repositories/Issues.repository.js';
import {createIssuesRepository , getIssuesByUserIdRepository , getIssuesAssignedToRepository , updateIssuesRepository , deleteIssuesRepository , getIssuesByidRepository , getIssuesByTitleRepository } from '../Repositories/Issues.repository.js';
import { getUserByIdRepository } from '../Repositories/User.repository.js';

export const createIssuesService = async (data , created_by) => {

    const {title , description ,status , priority  , assigned_to } = data

    // verify if a user exists
    const creatingUser = await getUserByIdRepository(created_by);
    if (!creatingUser) {
      const err =  new Error('Creating user not found');
      err.statusCode = 400;
      throw err;
    }

    // verify if a user exists
    const assignedUser = await getUserByIdRepository(assigned_to);
    if (!assignedUser) {
      const err =  new Error('Assigned user not found');
      err.statusCode = 400;
      throw err;
    }

    // Create user if user does not exist
    const issue = await createIssuesRepository({title , description ,status , priority , created_by , assigned_to });

    // TODO: Send email to user
    return issue;
}

export const getIssuesCreatedByService = async (id) => {

    const issues = await getIssuesByUserIdRepository(id);
    return issues;
}

export const getIssuesAssignedService = async (id) => {
    const issues = await getIssuesAssignedToRepository(id);
    return issues;
}

export const updateIssuesService = async (id , data , userId) => {

  const {title , description ,status , priority  , assigned_to } = data

    if(assigned_to){
    const assignedUser = await getUserByIdRepository(assigned_to);
    if (!assignedUser) {
      const err =  new Error('Assigned user not found');
      err.statusCode = 400;
      throw err;
    }
    }

    const issues = await updateIssuesRepository(id , {title , description ,status , priority  , assigned_to } , userId);

    // TODO: Send email to user
    return issues;
}


export const deleteIssuesService = async (id , actionBy) => {

  // verify user exists
  const user = await getUserByIdRepository(actionBy);
  if (!user) {
    const err =  new Error('User not found');
    err.statusCode = 400;
    throw err;
  }

    const issues = await deleteIssuesRepository(id , actionBy);

  // TODO: Send email to user
    return issues;
}

export const getIssuesByIdService = async (id , userId) => {

    // verify user exists
  const user = await getUserByIdRepository(userId);
  if (!user) {
    const err =  new Error('User not found');
    err.statusCode = 400;
    throw err;
  }

  const issues = await getIssuesByidRepository(id , userId);
  return issues;
}

export const getIssuesByTitleService = async (title , userId) => {

    // verify user exists
  const user = await getUserByIdRepository(userId);
  if (!user) {
    const err =  new Error('User not found');
    err.statusCode = 400;
    throw err;
  }

  const issues = await getIssuesByTitleRepository(title , userId);
  return issues;
}