import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// General reducer stuff
export type CaseReducerWithPrepare<State, Payload> = {
	reducer: CaseReducer<
		State,
		{
			payload: Payload;
			type: string;
		}
	>;
	prepare: (payload: Payload) => {
		payload: Payload;
		meta: Record<string, unknown> | undefined;
	};
};

// Api specific reducer stuff
export type DefaultPayloadError = { code: string; message: string };

export type ApiOperatorOptions = {
	reload?: boolean; // Used to reload page when optimistic api call fails
	showLoadingBar?: boolean;
};

export type ApiReducers<State, StartPayload, SuccessPayload, ErrorPayload> = {
	start?: CaseReducer<State, PayloadAction<StartPayload>>;
	success?: CaseReducer<State, PayloadAction<SuccessPayload>>;
	error?: CaseReducer<State, PayloadAction<ErrorPayload>>;
};

export type EntitiesFetchData = {
	status: 'pending' | 'loading' | 'loaded' | 'error';
};
