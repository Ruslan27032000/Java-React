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


function App() {

    const dispatch = useDispatch()
    const {items} = useSelector(state => state.reducer)
    const {isLogin} = useSelector(state => state.authReducer)
    const [taskText, setTaskText] = useState("")
    const [searchText, setSearchText] = useState("")
    const history = useHistory()

    useEffect(()=>{
        if(!isLogin){
            history.push("/auth")
        }
    },[isLogin])

    useEffect(() => {
        if(isLogin){
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
            <div style={{padding: '40px 0'}}>


                <Switch>
                    <Route exact path={"/"} render={() =>
                        <div className={styles.container}>
                            <div className={styles.addCard}>
                                <input
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                />
                                <button onClick={addTask}>Add</button>
                            </div>
                            <div className={styles.addCard}>
                                <input
                                    value={searchText}
                                    onChange={(e) => searchTask(e.target.value)}
                                />
                            </div>

                            <div className={styles.cardsContainer}>
                                {items.length ? items.map((item, index) => (
                                        <div key={index} className={styles.cards} onClick={() => {
                                            dispatch(new Actions().saveItem(item))
                                            history.push(`add/${item.id}`)
                                        }}>
                                            <p>{item.name}</p>
                                        </div>
                                    )) :
                                    <img src={"https://www.freeiconspng.com/uploads/red-circular-image-error-0.png"}/>
                                }
                            </div>
                        </div>}/>
                    <Route exact path={"/add/:id"} render={() => <ItemDesc/>}/>
                    <Route exact path={"/auth"} render={() => <Login/>}/>
                    <Route exact path={"/reg"} render={() => <Registration/>}/>
                </Switch>
            </div>
        </>
    );
}

export default App;
