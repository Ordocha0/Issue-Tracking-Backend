import {
  createUserService,
  updateUserService,
  deleteUserService,
  loginUserService,
  getUserService
} from '../Services/User.service.js';
import {generateJWTToken} from '../Utils/jwt.js';


export const createUserController = async (req, res) => {
  const start = process.hrtime.bigint();

  try {
    const user = await createUserService(req.body);

    req.log.info({ userId: req.params.id }, 'fetching user');
    res.status(201).json(user);

  } catch (error) {
    req.log.error(error, error.message);
    res.status(500).json({ message: error.message });
  }
};


export const getUserByIdController = async (req, res) => {
  const start = process.hrtime.bigint();

  try {
    const userId = req.params.id;
    const user = await getUserService(userId);

    req.log.info({ userId: req.params.id }, 'fetching user');
    res.status(200).json(user);

  } catch (error) {
    req.log.error(error, error.message);
    res.status(500).json({ message: error.message });
  }
};


export const updateUserController = async (req, res) => {
  const start = process.hrtime.bigint();

  try {
    const userId = req.user.sub;
    const user = await updateUserService(userId, req.body);

    req.log.info({ userId: req.params.id }, 'fetching user');
    res.status(200).json(user);

  } catch (error) {
   req.log.error(error, error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  const start = process.hrtime.bigint();

  try {
    const userId = req.user.sub;
    await deleteUserService(userId);

    req.log.info({ userId: req.params.id }, 'fetching user');
    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    req.log.error(error, error.message);
    res.status(500).json({ message: error.message });
  }
}

export const loginUserController = async (req, res) => {
  const start = process.hrtime.bigint();

  try {
    const { email, password } = req.body;
    
    const user = await loginUserService(email, password );
    const JWTToken = await generateJWTToken(user);

    req.log.info({ userId: req.params.id }, 'fetching user');
    res.status(200).json({...user  , token: JWTToken});

  } catch (error) {
    req.log.error(error, error.message);
    res.status(500).json({ message: error.message });
  }
};