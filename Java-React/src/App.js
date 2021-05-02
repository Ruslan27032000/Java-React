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
import {useBeforeunload} from 'react-beforeunload';
import japi from "./services/axios";
import LogsPage from "./components/LogsPage/LogsPage";

function App() {

	const dispatch = useDispatch()
	const {trello} = useSelector(state => state.reducer)
	const {isLogin} = useSelector(state => state.authReducer)
	const [tempTrello, setTempTrello] = useState(trello)
	const history = useHistory()


	useEffect(() => {
		if (!isLogin) {
			history.push("/auth")
		}
	}, [isLogin])

	useEffect(() => {
		if (isLogin) {
			dispatch(new Actions().getTrello())
		}
	}, [])

	const onLaneAdd = (e) => {
		dispatch(new Actions().postLogs("Add Board", `Board with title ${e.title} was added`))
	}

	const onLaneDelete = (e) => {
		dispatch(new Actions().postLogs("Delete Board", `Board was deleted`))
	}

	const onCardAdd = (e) => {
		dispatch(new Actions().postLogs("Add Card", `Card with title ${e.title} was added`))
	}

	const onCardDelete = (e) => {
		dispatch(new Actions().postLogs("Delete Card", `Card was deleted`))
	}

	const onCardMoveAcrossLanes = () => {
		dispatch(new Actions().postLogs("Replace Card", `Card was replaced`))
	}


	return (
		<>
			<NavBar/>
			<Route exact path={"/"} render={() =>
				<Board
					lang={"ru"}
					data={trello}
					draggable
					cardDraggable
					editable
					canAddLanes
					onLaneAdd={onLaneAdd}
					onCardAdd={onCardAdd}
					onLaneDelete={onLaneDelete}
					onCardDelete={onCardDelete}
					onDataChange={(e) => dispatch(new Actions().changeTrello(e))}
					onCardMoveAcrossLanes={onCardMoveAcrossLanes}
				/>}/>
			<Route exact path={"/logs"} component={LogsPage}/>
			<Route exact path={"/add/:id"} component={ItemDesc}/>
			<Route exact path={"/auth"} component={Registration}/>
		</>
	);
}

export default App;
