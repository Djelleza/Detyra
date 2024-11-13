import axios from 'axios';
import { User } from '../interface/TaskUserInterface';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('https://swapi.dev/api/people/');
    return response.data.results.map((user: any, index: number) => ({
      id: String(index + 1),
      name: user.name,
    }));
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};