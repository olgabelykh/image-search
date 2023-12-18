import React from 'react';

export type ErrorT = Error | string | null | undefined;

export type TAsyncState<T> = {
  data: T;
  error: ErrorT;
  isLoading: boolean;
  fetched: boolean;
};

type ActionTypeT = keyof typeof ASYNC_ACTION_TYPES;
type TAsyncAction<T> = {
  type: ActionTypeT;
  payload?: { data?: T; error?: ErrorT };
};

type TAsyncReducer<T = unknown> = (
  state: TAsyncState<T>,
  action: TAsyncAction<T>
) => TAsyncState<T>;

const ASYNC_ACTION_TYPES = {
  loading: 'loading',
  failed: 'failed',
  successed: 'successed',
};

const asyncReducer: TAsyncReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ASYNC_ACTION_TYPES.loading:
      return {
        ...state,
        error: null,
        isLoading: true,
        fetched: false,
      };
    case ASYNC_ACTION_TYPES.successed:
      return {
        ...state,
        data: payload?.data as unknown,
        isLoading: false,
        fetched: true,
      };
    case ASYNC_ACTION_TYPES.failed:
      return {
        ...state,
        error: payload?.error as ErrorT,
        isLoading: false,
        fetched: true,
      };
    default:
      return state;
  }
};

type RunT<T = unknown, K extends unknown[] = unknown[]> = (
  asyncCallback: (...args: K) => Promise<T>,
  ...args: K
) => void;

type UseAsyncResultT<T, K extends unknown[]> = TAsyncState<T> & {
  run: RunT<T, K>;
  setData: (data: T) => void;
};

type SafeDispatchT<T> = (action: T) => void;

export const useSafeDispatch = <T,>(
  dispatch: React.Dispatch<T>
): SafeDispatchT<T> => {
  const isMountedRef = React.useRef<boolean>(false);

  React.useLayoutEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return React.useCallback(
    (action: T) => {
      if (isMountedRef.current) {
        dispatch(action);
      }
    },
    [dispatch]
  );
};

export const useAsync = <
  T extends unknown = unknown,
  K extends unknown[] = unknown[]
>(
  initialState: TAsyncState<T> | (() => TAsyncState<T>)
): UseAsyncResultT<T, K> => {
  const actualInitialState =
    typeof initialState === 'function' ? undefined : initialState;
  const [state, unsafeDispatch] = React.useReducer<
    TAsyncReducer<T>,
    unknown
  >(
    asyncReducer as TAsyncReducer<T>,
    initialState as TAsyncState<T>,
    () => initialState as TAsyncState<T>
  );
  const dispatch = useSafeDispatch<TAsyncAction<T>>(unsafeDispatch);

  const run: RunT<T, K> = React.useCallback(
    (asyncCallback, ...args) => {
      dispatch({ type: ASYNC_ACTION_TYPES.loading as ActionTypeT });

      asyncCallback(...args)
        .then((data) => {
          dispatch({
            type: ASYNC_ACTION_TYPES.successed as ActionTypeT,
            payload: { data },
          });
        })
        .catch((error) => {
          dispatch({
            type: ASYNC_ACTION_TYPES.failed as ActionTypeT,
            payload: { error },
          });
        });
    },
    [dispatch]
  );

  const setData = React.useCallback(
    (data: T) => {
      dispatch({
        type: ASYNC_ACTION_TYPES.successed as ActionTypeT,
        payload: { data },
      });
    },
    [dispatch]
  );

  return { ...state, setData, run };
};
