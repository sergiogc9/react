import { CaseReducer, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import {
	ApiOperatorOptions,
	ApiReducers,
	CaseReducerWithPrepare,
	DefaultPayloadError,
	EntitiesFetchData
} from './types';

const getReducer = <State, Payload = void>(
	reducer: CaseReducer<State, PayloadAction<Payload>>,
	meta?: Record<string, unknown>
): CaseReducerWithPrepare<State, Payload> => ({
	reducer,
	prepare: (payload: Payload) => ({ payload, meta })
});

const getApiReducers = <State, StartPayload = void, SuccessPayload = void, ErrorPayload = DefaultPayloadError>(
	reducers: ApiReducers<State, StartPayload, SuccessPayload, ErrorPayload>,
	options?: ApiOperatorOptions
): [
	CaseReducerWithPrepare<State, StartPayload>,
	CaseReducerWithPrepare<State, SuccessPayload>,
	CaseReducerWithPrepare<State, ErrorPayload>
] => {
	const defaultReducer: CaseReducer<State> = state => state as State;
	return [
		getReducer<State, StartPayload>(reducers.start || defaultReducer, {
			api: 'start'
		}),
		getReducer<State, SuccessPayload>(reducers.success || defaultReducer, {
			api: 'success'
		}),
		getReducer<State, ErrorPayload>(reducers.error || defaultReducer, {
			api: 'error',
			reload: options?.reload
		})
	];
};

const getEntityFetchReducers = <
	T,
	StartPayload = void,
	SuccessPayload = void,
	ErrorPayload = DefaultPayloadError
>() => {
	return getApiReducers<EntityState<T> & EntitiesFetchData, StartPayload, SuccessPayload, ErrorPayload>({
		start: state => {
			state.status = 'loading';
		},
		success: state => {
			state.status = 'loaded';
		},
		error: state => {
			state.status = 'error';
		}
	});
};

export { createSlice, getApiReducers, getEntityFetchReducers, getReducer };
