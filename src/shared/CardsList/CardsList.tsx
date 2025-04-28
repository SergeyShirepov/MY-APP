import React, { useRef, useCallback, memo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { Card } from './Card';
import usePosts from '../../Hooks/usePosts';
import { useSelector } from 'react-redux';
import { IUserData } from '../../store/actions';


const CARD_HEIGHT = 155;

// Мемоизированный компонент списка
export const CardsList = memo(function CardsList() {
  const listRef = useRef<FixedSizeList>(null);

  const { name ='' } = useSelector<RootState, IUserData>((state) => state.userData.data);

  interface RootState {
    userData: any;
    accountPoint: {
      accountPoint: string;
    };
    sortBy: {
      sortBy: string;
    };
    searchBy: {
      searchBy: string;
    };
  }

  
  const { posts = [], isLoading, error, hasMore, loadMorePosts } = usePosts(0, 12, name);

  
  

  // Мемоизированная функция для отслеживания прокрутки
  const onItemsRendered = useCallback(
    ({ visibleStopIndex }: { visibleStopIndex: number }) => {
      const triggerPoint = Math.floor(posts.length * 0.75);
      if (visibleStopIndex >= triggerPoint && !isLoading && hasMore && loadMorePosts && posts.length > 0) {
        loadMorePosts();
      }
    },
    [posts.length]
  );

  // Мемоизированная функция рендеринга строк
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const post = posts[index];



      return (
        <div style={style}>
          <Card card={post} />
        </div>
      );
    },
    [posts]
  );


  console.log(' CardList',{posts});
  return (
      <div style={{ height: '100%', width: '100%', padding: '0px' }}>
        <AutoSizer>
          {({ height, width }: Size) => (
            <FixedSizeList
              ref={listRef}
              height={height}
              itemCount={posts.length}
              itemSize={CARD_HEIGHT}
              width={width}
              overscanCount={5}
              onItemsRendered={onItemsRendered}
            >
              {Row}
            </FixedSizeList>
          )}
        </AutoSizer>
        
      </div>
  );
});