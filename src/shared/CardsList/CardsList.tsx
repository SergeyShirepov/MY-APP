import React, { useRef } from 'react';
import { FixedSizeList } from 'react-window';
import { ICardType } from '../../types/ICardType';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { Card } from './Card';


type CardsListProps = {
  posts: ICardType[];
  isLoading?: boolean;
  hasMore?: boolean;
  loadMorePosts?: () => void;
};

const CARD_HEIGHT = 155;

export const CardsList: React.FC<CardsListProps> = ({ posts, isLoading, hasMore, loadMorePosts }) => {
  const listRef = useRef<FixedSizeList>(null);

  // Функция для отслеживания прокрутки
  const onItemsRendered = ({ visibleStopIndex }: { visibleStopIndex: number }) => {
    const triggerPoint = Math.floor(posts.length * 0.75);
    if (visibleStopIndex >= triggerPoint && !isLoading && hasMore && loadMorePosts) {
      loadMorePosts();
    }
  };

  const Row: React.FC<{ index: number; style: React.CSSProperties }> = ({ index, style }) => {
    const post = posts[index];
    return (
      <div style={style}>
        <Card card={post} />
      </div>
    );
  };

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
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Loading more posts...
        </div>
      )}
    </div>
  );
};