import {Issues} from '../Models/index.js';
import { Op } from 'sequelize';

export const createIssuesRepository = async (data) => {
  try {
    const issues = await Issues.create(data);
    return issues
  } catch (error) {
    const err =  new Error(error.message);
    throw err;
  }
}

export const getIssuesByUserIdRepository = async (userId) => {
  try {
    const issues = await Issues.findAll({ where: { created_by: userId } });
    return issues.get({ plain: true });
  } catch (error) {
    const err =  new Error(error.message);
    throw err;
  }
}

export const getIssuesAssignedToRepository = async (userId) => {
  try {
    const issues = await Issues.findAll({ where: { assigned_to: userId } });
    return issues.get({ plain: true });
  } catch (error) {
    const err =  new Error(error.message);
    throw err;
  }
}


export const updateIssuesRepository = async (id, data , userId) => {
  try {
    const issues = await Issues.findAll({ where: { id: id , created_by: userId } });
    if (!issues) {
      throw new Error('Issues not found');
    }

    await issues.update({...data , updated_at: new Date()});
    
    return issues.get({ plain: true });
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}

export const deleteIssuesRepository = async (id , IssuesId) => {
  try {
    const issues = await Issues.findAll({ where: { id , created_by: IssuesId } });
    if (!issues) {
      throw new Error('Issue not found');
    }

    await issues.destroy();
    
    return issues.get({ plain: true });
  } catch (error) {
    const err =  new Error(error.message);
    throw err;
  }
}

export const getIssuesByidRepository  = async (id , userId) => {
  try {
    const issues = await Issues.findOne({ 
      where: 
      { id , 
        [Op.or]: [{ created_by: userId }, { assigned_to: userId }]} });
    return issues.get({ plain: true });
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}


  
export const getIssuesByTitleRepository  = async (title , userId) => {
  try {
    const issue = await Issues.findOne({ 
      where: { title , 
        [Op.or]: [{ created_by: userId }, { assigned_to: userId }]} });
    return issue.get({ plain: true });
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}

// export const checkDeletedUserRepository = async (email) => {
//   try {
//     const issues = await Issues.unscoped().findOne({ where: { email } }, { attributes: { include: ['password'] } })
//   return issues
//   } catch (error) {
//           const err =  new Error(error.message);
//     throw err;
//   }
// }