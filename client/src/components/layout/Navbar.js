import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
	return  (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/dashboard"><i className="fas fa-users"></i> Junior Network </Link>
			</h1>
			<ul>
				<li><Link to="/profiles=">Juniorzy</Link></li>
				<li><Link to="/register">Rejestracja</Link></li>
				<li><Link to="/login">Logowanie</Link></li>
			</ul>
		</nav>
	)
}
export default Navbar