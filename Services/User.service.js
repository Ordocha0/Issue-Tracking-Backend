import {
  createUserRepository,
  getUserByIdRepository,
  updateUserRepository,
  deleteUserRepository,
  getUserByEmailRepository,
  getUserPasswordRepository
} from '../Repositories/User.repository.js';

import { comparePassword , hashPassword } from '../Utils/bcrypt.js';

export const createUserService = async (data) => {
  try {
    const {email , first_name ,last_name , phone , password , role } = data

    // verify if a user exists
    const existingUser = await getUserByEmailRepository(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user if user does not exist
    const user = await createUserRepository({email , first_name ,last_name , phone , password:hashedPassword , role });

    // TODO: Send email to user
    return user;
  } catch (error) {
    throw error;
  }
}

export const updateUserService = async (id, data) => {
  try {
    const {email , first_name ,last_name , phone , password , role } = data

    // verify if a user exists
    const existingUser = await getUserByIdRepository(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update user Details
    const user = await updateUserRepository(id, {email , first_name ,last_name , phone , password , role });

    // TODO: Send email to user
    return user;
  } catch (error) {
    throw error;
  }
}

export const deleteUserService = async (id) => {
  try {

        // verify if a user exists
    const existingUser = await getUserByIdRepository(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Delete user
    const user = await deleteUserRepository(id);

    // TODO: Send email to user
    return user;
  } catch (error) {
    throw error;
  }
}

export const loginUserService = async (email , password) => {
  try {
    const user = await getUserByEmailRepository(email);
    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await getUserPasswordRepository(user.id);
    const isPasswordMatch = await comparePassword(password, hashedPassword);
    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    // TODO: Send valid token and refresh token
    return user;
  } catch (error) {
    throw error;
  }
}

export const getUserService = async (id) => {
  try {
    const user = await getUserByIdRepository(id);
    return user;
  } catch (error) {
    throw error;
  }
}