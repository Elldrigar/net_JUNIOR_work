<h1 align="center">
  <br>
  <a href=""><img src="https://gawron.me/gawronLogo.png" alt="GawronMe" width="150"></a>
  <br>
  Junior Network
  <br>
</h1>

![GitHub Release][gitHub-url]
![MIT License][mit-license-image]
[![Twitter Follow][twitterBadge-url]][twitter-url]

[gitHub-url]: https://badgen.net/github/release/Elldrigar/net_JUNIOR_work?icon=github
[mit-license-image]: https://badgen.net/badge/license/MIT/blue
[twitterBadge-url]: https://badgen.net/twitter/follow/Elldrigar?icon=twitter
[twitter-url]: https://twitter.com/Elldrigar

# 🚧 Project is under construction‼️ 🚧
***
🇵🇱 __'Junior Network' to aplikacja w której można założyć konto, storzyć obszerny Profil pisać posty oraz komentowac i (👍🏻/👎🏻) posty innych użytkowników.


# Ver. 1.0.0 Pre-release
 - available at [HEROKU](https://warm-escarpment-27152.herokuapp.com/) - Wait few sec. for 
waking up the server. 😃
 - Works well on desktops only!
 - 
 # Working on:
 - Password reseting by e-mail
 - Upload files for avatar
 - RWD, and new design
 
 


## Available Scripts:
In the project directory, you should run:
```
    npm install
```
> Install the dependencies in the local node_modules folder.  
 Make sure you have Node and NPM installed! 🙊

```
    npm run server
```
> Starts backend Express server on [http://localhost:5000](http://localhost:5000) <br />
> In root directory add a ``default.json`` file with following:
```json
 {
   "mongoURI": "<ADD_YOUR_MONGODB_ATLAS_URI_WITH_CREDENTIALS>",
   "jwtSecret": "mysecrettoken",
   "githubToken": "<YOUR_GITHUB_SECRET_TOKEN>"
 }
```
***

```
    npm dev
```
> Starts backend server [http://localhost:5000](http://localhost:5000) and frontend server [http://localhost:3000](http://localhost:3000) 
together.

