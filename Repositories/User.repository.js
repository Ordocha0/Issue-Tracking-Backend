import {User} from '../Models/index.js';

export const createUserRepository = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw error;
  }
}

export const getUserByIdRepository = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw error;
  }
}


export const updateUserRepository = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.update({...data , updated_at: new Date()});
    
    return user;
  } catch (error) {
    throw error;
  }
}

export const deleteUserRepository = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
    
    return user;
  } catch (error) {
    throw error;
  }
}

export const getUserByEmailRespository  = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw error;
  }
}