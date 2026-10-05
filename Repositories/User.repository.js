import {User} from '../Models/index.js';

export const createUserRepository = async (data) => {
  try {
    const user = await User.create(data);
    const {password , ...userWithPassword} = user.toJSON()
    return userWithPassword
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}

export const getUserByIdRepository = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user.get({ plain: true });
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}


export const updateUserRepository = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.update({...data , updated_at: new Date()});
    
    return user.get({ plain: true });
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}

export const deleteUserRepository = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
    
    return user.get({ plain: true });
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}

export const getUserByidRepository  = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user.get({ plain: true });
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}

export const getUserPasswordRepository  = async (id) => {
  try {
    const user = await User.unscoped().findByPk(id, { attributes: { include: ['password'] } })
    return user.password;
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}

  
export const getUserByEmailRepository  = async (email) => {
  try {
    const user = await User.findOne({ where: { email } })
    return user.get({ plain: true });
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}

export const checkDeletedUserRepository = async (email) => {
  try {
    const user = await User.unscoped().findOne({ where: { email } }, { attributes: { include: ['password'] } })
  return user
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}

export const getUsersRepository = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
          const err =  new Error(error.message);
    throw err;
  }
}