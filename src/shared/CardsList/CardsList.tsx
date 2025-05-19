import React, { useRef, useCallback, memo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { Card } from './Card';
import usePosts from '../../Hooks/usePosts';
import user, { selectUser, UserData } from '../../store/features/user';
import { useAppSelector } from '../../store/hooks';


const CARD_HEIGHT = 155;

// Мемоизированный компонент списка
export const CardsList = memo(function CardsList() {
  const listRef = useRef<FixedSizeList>(null);

  const data = useAppSelector(selectUser);    
    const name = user?.name ?? "";   

  const { posts = [], isLoading, error, hasMore, loadMorePosts } = usePosts(0, 12, name);

  const onItemsRendered = useCallback(
    ({ visibleStopIndex }: { visibleStopIndex: number }) => {
      const triggerPoint = Math.floor(posts.length * 0.75);
      if (visibleStopIndex >= triggerPoint && !isLoading && hasMore && loadMorePosts && posts.length > 0) {
        loadMorePosts();
      }
    },
    [posts.length]
  );

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