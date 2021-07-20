// TODO: Think how to use it with API implementation
// import { put, call } from "redux-saga/effects";
// import { ActionCreator } from "typescript-fsa";
// import { isArray } from "lib/imports/lodash";
// import { DefaultPayloadError } from "./actions";

// type par = NonNullable<any>;
// export function* callCatch<ErrorPayload = DefaultPayloadError>(args: Function | [par, ...par[]], actionError: ActionCreator<ErrorPayload>) {
// 	const pars: [par, ...par[]] = isArray(args)? args : [args];
// 	try {
// 		const result = yield call(...pars);
// 		return result;
// 	} catch (error) {
// 		yield put(actionError(error));
// 	}
// }
