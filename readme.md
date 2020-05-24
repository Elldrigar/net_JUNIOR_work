# Junior Network ‍

![GitHub Release][gitHub-url]
![MIT License][mit-license-image]
[![Twitter Follow][twitterBadge-url]][twitter-url]

[gitHub-url]: https://badgen.net/github/release/Elldrigar/net_JUNIOR_work?icon=github
[mit-license-image]: https://badgen.net/badge/license/MIT/blue
[twitterBadge-url]: https://badgen.net/twitter/follow/Elldrigar?icon=twitter
[twitter-url]: https://twitter.com/Elldrigar

***
🇵🇱 'Junior Network' to aplikacja w której można założyć konto, storzyć obszerny Profil pisać posty oraz komentowac i (👍🏻/👎🏻) posty innych użytkowników.


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
> Starts backend nodemon server on [http://localhost:5000](http://localhost:5000) <br />
> In root directory you should create : ``default.json`` file and replace uppercases to yours data.
```json
{
  "mongoURI": "ADD_YOUR_CONNECTION_STRING",
  "jwtSecret": "mysecrettoken",
  "githubToken": "YOUR_GITHUB_TOKEN"
}
```

