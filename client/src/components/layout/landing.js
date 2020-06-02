import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return  (
		<section className="landing">
			<div className="dark-overly">
				<div className="landing-inner">
					<h1 className="x-large">Junior Network</h1>
					<p className="lead">Stwórz juniorski profil i portfolio, dziel się postami i uzyskuj pomoc od innych
						deweloperów</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">Zarejestruj się</Link>
						<Link to="/login" className="btn">Zaloguj się</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Landing