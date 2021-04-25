import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "./redux/actions";
import styles from "./App.module.css"
import {Route, Switch, useHistory} from "react-router-dom";
import ItemDesc from "./components/ItemDesc/ItemDesc";
import debounce from "./tools/debounce";
import NavBar from "./components/NavBar/Navbar";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import data from "./data.json";
import Board from "react-trello";

function App() {

	const dispatch = useDispatch()
	const {items} = useSelector(state => state.reducer)
	const {isLogin} = useSelector(state => state.authReducer)
	const [taskText, setTaskText] = useState("")
	const [searchText, setSearchText] = useState("")
	const history = useHistory()


	useEffect(() => {
		if (!isLogin) {
			history.push("/auth")
		}
	}, [isLogin])

	useEffect(() => {
		if (isLogin) {
			dispatch(new Actions().getItems())
		}
	}, [])


	const addTask = () => {
		setTaskText("")
		dispatch(new Actions().addItem(taskText))
	}


	const searchTask = (text) => {
		setSearchText(text)
		debounce(() => dispatch(new Actions().searchTask(text)), 700)
	}


	return (
		<>
			<NavBar/>
			<Switch>
				<Route exact path={"/"} render={() =>
					<Board
						lang={"ru"}
						data={data}
						draggable
						cardDraggable
						editable
						canAddLanes
						onLaneAdd={e => console.log('lane', e)}
						onLaneClick={e => console.log('on lane click', e)}
						onCardAdd={(e => console.log('card', e))}
						onCardMoveAcrossLanes={e => console.log('card moves', e)}
						onCardClick={e => console.log('on card click', e)}
					/>}/>
				<Route exact path={"/add/:id"} render={() => <ItemDesc/>}/>
				<Route exact path={"/auth"} render={() => <Login/>}/>
				<Route exact path={"/reg"} render={() => <Registration/>}/>
			</Switch>
		</>
	);
}

export default App;
