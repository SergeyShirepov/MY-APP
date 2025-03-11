import { useReducer } from 'react';

// Типы для состояния и действий
type State = {
  karmaValue: number;
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: 'UPDATE_KARMA_REQUEST' }
  | { type: 'UPDATE_KARMA_SUCCESS'; payload: number }
  | { type: 'UPDATE_KARMA_FAILURE'; payload: string };


const karmaReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_KARMA_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'UPDATE_KARMA_SUCCESS':
      return {
        ...state,
        karmaValue: action.payload,
        isLoading: false,
      };
    case 'UPDATE_KARMA_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


const useKarma = (initialKarmaValue: number, postId: string) => {
  const initialState: State = {
    karmaValue: initialKarmaValue,
    isLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(karmaReducer, initialState);

  const updateKarma = async (delta: number) => {
    dispatch({ type: 'UPDATE_KARMA_REQUEST' });

    try {
      const response = await fetch(`/api/posts/${postId}/karma`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ delta }),
      });

      if (!response.ok) {
        throw new Error('Failed to update karma');
      }

      const updatedPost = await response.json();
      dispatch({ type: 'UPDATE_KARMA_SUCCESS', payload: updatedPost.karmaValue });
    } catch (error) {
      const err = error as Error;
      dispatch({ type: 'UPDATE_KARMA_FAILURE', payload: err.message });
    }
  };

  return {
    karmaValue: state.karmaValue,
    isLoading: state.isLoading,
    error: state.error,
    updateKarma,
  };
};

export default useKarma;