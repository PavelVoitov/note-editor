import {useDispatch} from "react-redux";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";
import store from "redux/store";

type AppDispatchType = typeof store.dispatch
export const AppDispatch = () => useDispatch<AppDispatchType>()

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
	const dispatch = AppDispatch()
	return useMemo(() => {
		return bindActionCreators(actions, dispatch)
	}, [])
}