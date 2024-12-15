import axios from 'axios';
import { Repos } from '../models/Repo';

const BASE_URL = 'https://api.github.com/search/repositories';

export const getRepos = async (page: number, date: string): Promise<Repos> => {
  const token = '';

  const url = token ? `${BASE_URL}?q=created:>${date}&sort=stars&order=desc&page=${page}&per_page=10` : '../../mockData.json';

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Cache-Control': 'no-cache'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};
