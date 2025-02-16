import { backendApiInstance } from '.';

const getAllUsers = async () => {
  const result = await backendApiInstance.get('users');
  return result.data;
};

export const usersApi = {
  getAllUsers,
};
