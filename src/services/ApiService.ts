import axios from 'axios';
import { Repos } from '../models/Repo';

const BASE_URL = 'https://api.github.com/search/repositories';

export const getRepos = async (page: number, date: string, token: string): Promise<Repos> => {
  const url = `${BASE_URL}?q=created:>${date}&sort=stars&order=desc&page=${page}&per_page=10`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `token ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};
