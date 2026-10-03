import {
  createUserRepository,
  getUserByIdRepository,
  updateUserRepository,
  deleteUserRepository,
  getUserByEmailRepository,
  getUserPasswordRepository,
  checkDeletedUserRepository
} from '../Repositories/User.repository.js';

import { comparePassword , hashPassword } from '../Utils/bcrypt.js';

export const createUserService = async (data) => {

    const {email , first_name ,last_name , phone , password , role } = data

    // verify if a user exists
    const deletedUser = await checkDeletedUserRepository(email);
    if (deletedUser) {
      const err =  new Error('User already exists');
      err.statusCode = 400;
      throw err;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user if user does not exist
    const user = await createUserRepository({email , first_name ,last_name , phone , password:hashedPassword , role });

    // TODO: Send email to user
    return user;
}

export const updateUserService = async (id, data) => {

    const {email , first_name ,last_name , phone , password , role } = data

    // verify if a user exists
    const existingUser = await getUserByIdRepository(id);
    if (!existingUser) {
      const err = new Error('User not found');
      err.statusCode = 400;
      throw err;
    }

    // Update user Details
    const user = await updateUserRepository(id, {email , first_name ,last_name , phone , password , role });

    // TODO: Send email to user
    return user;
}

export const deleteUserService = async (id) => {


        // verify if a user exists
    const existingUser = await getUserByIdRepository(id);
    if (!existingUser) {
            const err =  new Error('User already exists');
      err.statusCode = 400;
      throw err;
    }

    // Delete user
    const user = await deleteUserRepository(id);

    // TODO: Send email to user
    return user;
}

export const loginUserService = async (email , password) => {

    const user = await getUserByEmailRepository(email);
    if (!user) {
            const err =  new Error('User already exists');
      err.statusCode = 400;
      throw err;
    }

    const hashedPassword = await getUserPasswordRepository(user.id);
    const isPasswordMatch = await comparePassword(password, hashedPassword);
    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    // TODO: Send valid token and refresh token
    return user;
}

export const getUserService = async (id) => {

    const user = await getUserByIdRepository(id);
    return user;
}