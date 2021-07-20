import { getReducer, getApiReducers, getEntityFetchReducers } from './reducer';

type State = { fake: string };

const error = { code: 'fake-code', message: 'Fake error message' };
const reducer = (state: State) => state;
const getFullState = (): State => ({ fake: 'FAKE' });

describe('Store reducer lib', () => {
	it('should getReducer return a prepared reducer action', () => {
		const preparedAction = getReducer<State, number>(reducer);
		expect(preparedAction.reducer).toEqual(reducer);
		expect(preparedAction.prepare(3)).toEqual({ payload: 3, meta: undefined });
	});

	it('should getReducer return a prepared reducer action with meta', () => {
		const preparedAction = getReducer<State, number>(reducer, { api: 'start' });
		expect(preparedAction.reducer).toEqual(reducer);
		expect(preparedAction.prepare(3)).toEqual({
			payload: 3,
			meta: { api: 'start' }
		});
	});

	it('should getApiReducer return correct reducers', () => {
		const [startAction, successAction, errorAction] = getApiReducers<State, void, number>({
			start: reducer,
			success: reducer,
			error: reducer
		});
		expect(startAction.reducer).toEqual(reducer);
		expect(startAction.prepare()).toEqual({
			payload: undefined,
			meta: { api: 'start' }
		});
		expect(successAction.reducer).toEqual(reducer);
		expect(successAction.prepare(10)).toEqual({
			payload: 10,
			meta: { api: 'success' }
		});
		expect(errorAction.reducer).toEqual(reducer);
		expect(errorAction.prepare(error)).toEqual({
			payload: error,
			meta: { api: 'error' }
		});
	});

	it('should getApiReducer return error reducer with reload option', () => {
		const [, , errorAction] = getApiReducers<State, void, number>({}, { reload: true });
		expect(errorAction.prepare(error)).toEqual({
			payload: error,
			meta: { api: 'error', reload: true }
		});
	});

	it('should getApiReducer return default reducers which does not change state', () => {
		const [, , errorAction] = getApiReducers<State, void, number>({});
		expect(errorAction.reducer(getFullState(), { type: 'fake', payload: error })).toEqual(getFullState());
	});

	it('should getEntityFetchReducers return correct reducers', () => {
		const [startAction, successAction, errorAction] = getEntityFetchReducers<State, void, number>();
		expect(startAction.prepare()).toEqual({
			payload: undefined,
			meta: { api: 'start' }
		});
		expect(successAction.prepare(10)).toEqual({
			payload: 10,
			meta: { api: 'success' }
		});
		expect(errorAction.prepare(error)).toEqual({
			payload: error,
			meta: { api: 'error' }
		});
	});
});
