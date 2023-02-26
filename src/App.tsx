import React, { useEffect } from 'react';
import './App.css';
import PostContainer from './components/PostContainer';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/ActionCreators';
// import { userSlice } from './store/reducers/UserSlice';

function App() {
	const dispatch = useAppDispatch();
	// const { count } = useAppSelector(state => state.userReduser)
	// const { increment } = userSlice.actions;

	const { users, isLoading, error } = useAppSelector(state => state.userReduser)

	useEffect(()=>{
		dispatch(fetchUsers());
	}, [])

	return (
		<div className="App">
			<PostContainer></PostContainer>
			{error && <h1>{error}</h1>}
			<h1>{isLoading ? 'Идёт загрузка...' : JSON.stringify(users, null, 2)}</h1>
			{/* <button onClick={()=> dispatch(increment(1))}>Button</button> */}
		</div>
	);
}

export default App;
