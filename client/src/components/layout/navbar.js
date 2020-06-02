import React from 'react';

const Navbar = () => {
	return  (
		<nav className="navbar bg-dark">
			<h1>
				<a href="dashboard.html"><i className="fas fa-users"></i> Junior Network </a>
			</h1>
			<ul>
				<li><a href="profiles.html">Juniorzy</a></li>
				<li><a href="register.html">Rejestracja</a></li>
				<li><a href="login.html">Logowanie</a></li>
			</ul>
		</nav>
	)
}
export default Navbar