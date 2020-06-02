import React from 'react';

const Landing = () => {
	return  (
		<section className="landing">
			<div className="dark-overly">
				<div className="landing-inner">
					<h1 className="x-large">Junior Network</h1>
					<p className="lead">Stwórz juniorski profil i portfolio, dziel się postami i uzyskuj pomoc od innych
						deweloperów</p>
					<div className="buttons">
						<a href="register.html" className="btn btn-primary">Zarejestruj się</a>
						<a href="login.html" className="btn">Zaloguj się</a>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Landing