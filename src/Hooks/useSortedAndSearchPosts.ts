import { useMemo } from 'react';
import { ICardType } from '../shared/CardsList/CardsList';

export const useSortedAndSearchPosts = (  posts: ICardType[],  sortBy: string,  serchBy: string) => {

  return useMemo(() => {
    let filteredPosts = [...posts];

    // Фильтрация по поиску
    if (serchBy) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(serchBy.toLowerCase())
      );
    }

    // Сортировка
    if (sortBy === 'karma') {
      filteredPosts.sort((a, b) => b.karmaValue - a.karmaValue);
    } else if (sortBy === 'dataPost') {
      filteredPosts.sort((a, b) => new Date(b.timePublished).getTime() - new Date(a.timePublished).getTime());
    }

    return filteredPosts;
  }, [posts, sortBy, serchBy]);
  
};