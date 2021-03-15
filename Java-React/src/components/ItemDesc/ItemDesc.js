import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../redux/actions";
import styles from "./ItemDesc.module.css"

export default function ItemDesc() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {itemsDesc, item} = useSelector(state => state.reducer)
    const [task, setTask] = useState("")


    useEffect(() => {
        dispatch(new Actions().getItemsDesc(id))
    }, [])


    const addTask = () => {
        setTask("")
        dispatch(new Actions().addTask(task, item))
    }

    const deleteTask=(id)=>{
        dispatch(new Actions().deleteTask(id))
    }

    return (
        <div className={styles.container}>
            <div className={styles.task}>
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask}>Add</button>
            </div>
            {itemsDesc.map((task,index) => (
                <div className={styles.task} key={index}>
                    {task.taskText}
                    <button onClick={()=>deleteTask(task.id)}>Delete</button>
                </div>
            ))}

        </div>
    )
}
