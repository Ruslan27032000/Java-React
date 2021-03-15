import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "./redux/actions";
import styles from "./App.module.css"
import {Route, Switch, useHistory} from "react-router-dom";
import ItemDesc from "./components/ItemDesc/ItemDesc";
import debounce from "./tools/debounce";



function App() {

    const dispatch = useDispatch()
    const {items} = useSelector(state => state.reducer)
    const [taskText, setTaskText] = useState("")
    const [searchText, setSearchText] = useState("")
    const history = useHistory()

    useEffect(() => {
        dispatch(new Actions().getItems())
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
                                        history.push(`/${item.id}`)
                                    }}>
                                        <p>{item.name}</p>
                                    </div>
                                )) :
                                <img src={"https://www.freeiconspng.com/uploads/red-circular-image-error-0.png"}/>
                            }
                        </div>
                    </div>}/>
                <Route exact path={"/:id"} render={() => <ItemDesc/>}/>
            </Switch>
        </>
    );
}

export default App;
