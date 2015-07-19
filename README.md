# reddit-reader-backbone
A minimalist single-page client for Reddit, developed using `Backbone.js`. *Reddit Reader* allows its users to: 
- Login to Reddit using OAuth 2.0 - Implicit Grant Flow (*Reddit Reader* will never ask you for your password)
- View subscribed, default and popular subreddits (and even jump to any subreddit you like)
- View post listings along with the ability to sort them by 'Hot', 'New', 'Rising', 'Controversial' and 'Top'
- View embedded post content (images and videos) by simply clicking on a post thumbnail
- View comments for any post along with the ability to sort them and jump between threads 
- Vote on posts and comments
- Seamlessly switch between light and dark themes

**Note:** Since *Reddit Reader* authhenticates its users using implicit grant flow, the acquired access tokens only last for 60 minutes.
On expiration, *Reddit Reader* will notify you and request you to re-authenticate. 

### How do I get set up? 
After cloning the repository, run the following command from the root directory to minify all JavaScript modules into a single file 
`javascripts/build/main.min.js`: 
```
$ node javascripts/libs/r.js -o name=main out=javascripts/build/main.min.js mainConfigFile=javascripts/main.js include=libs/require.js
```
Now you just need to launch a local web server (something like [localhost-now](https://www.npmjs.com/package/localhost-now) 
or [SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html)) and start exploring  *Reddit Reader* in your 
preferred web browser.

### Any queries?
Send me an email at [manas.bajaj94@gmail.com](manas.bajaj94@gmail.com)
