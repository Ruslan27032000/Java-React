import React from 'react'
import styles from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

export default function NavBar() {
	const {isLogin} = useSelector(state => state.authReducer)

	const logOut = () => {
		localStorage.removeItem("token")
		window.location.href = "/auth"
	}

	return (
		<ul className={styles.container}>
			{isLogin ?
				<>
					<li><NavLink exact to={"/"} activeClassName={styles.activeLink}><i className="fa fa-table"
																					   aria-hidden="true"/>Home</NavLink>
					</li>
					<li><NavLink exact to={"/logs"} activeClassName={styles.activeLink}><i className="fa fa-th-list"
																						   aria-hidden="true"/>Logs</NavLink></li>
					<li><a onClick={logOut} style={{cursor: "pointer"}}><i className="fa fa-sign-out"
																		   aria-hidden="true"/>Log Out</a></li>
				</>
				:
				<>
					<li><NavLink exact to={"/reg"} activeClassName={styles.activeLink}>Registration</NavLink></li>
					<li><NavLink exact to={"/auth"} activeClassName={styles.activeLink}>Auth</NavLink></li>
				</>

			}

		</ul>

	)
}
