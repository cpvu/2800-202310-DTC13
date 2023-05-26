 
## 1.Project Description
Our app Cryptoment AI lets users view sentimental analysis and performance of different cryptocurrencies.

## 2.Names of Contributors
Team Members 
Ankit
Bryan Fung
Calvin Vu
Michael Yu


## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
HTML, CSS, JavaScript
Bootstrap 5.0 (Frontend library)
React
Google Material Symbols
Google Material Icons
Vercel app


## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Click the link below
https://2800-202310-dtc-13.vercel.app/

## 5. Contents of Folder
Content of the project folder:

```
Client
    - public
        - favicon.ico
        - next.svg
        - thirteen.svg
        - vercel.svg

    - src
        - components
            - coin
                - services
                    - addWatchlistCoin.js       # Add a coin to the watchlist
                    - fetchCoinInformation.js   # Get information about a fetched coin
                    - fetchCoinNews.js          # Get news about a fetched coin
                    - fetchCoinPrices.js        # Get price about a fetched coin
               
                - CoinDescription.js            # Describe the coin
                - CoinNew.js                    # Give news about the coin         
                - CoinPrices.js                 # Show the coin's price
                - TokenPageDivider.js           # Show the tokens


            - common
                - BottomNavbar.js               # Make the navbar
                - CustomStatLabel.js            # Label the stats
                - Footer.js                     # Make the Footer
                - LogoutButton.js               # Make a logout button
                - Navbar.js                     # Make routes in the navbar


            - forgotpassword
                - ForgotPasswordForm.js         # Make a form for a user who forgets his/her password

            - home
                - HomeHeader.js                 # Make a header for the snake game
                - SnakeMiniGame.js              # Easter egg game

            - layouts
                - Layout.js                     # Make a layout for each page

            - login
                - LoginForm.js                  # Make a login form

            - resetpassword
                - ResetPasswordForm.js          # Send an email for the user to reset a password

            - signup
                - SignUpForm.js                 # Make a signup form for the user

            - watchlist
                - services
                    - fetchWatchlist.js         # Get the watchlist
                - AddWatchlistCoinButton.js     # Set button for the user to add a coin 
            
            - index.js                          # Export the pages required for the client



        - constants                 # Constant folder
            - coins.js              # Exports some main coin types
            - endpoints.js          # Exports the pages that shows password resets, signup, login, questions, and coin descriptions

        - pages                     # Pages folder
            - api/auth              # API authentication folder
                - [...nextauth].js  # Refactor next auth to set express time

            - forgot                # forget password folder
                - password.js       # Gives the user forgot password form if the user forgets his/her password

            - reset/password        # Rest password folder
                - [resetToke].js    # Gives the user reset password form if the user forgets his/her password


            - search                # Token search folder     
                - [...coin].js      # Allows the user to user up tokens

            - _app.js               # Export app with layouts
            - _document.js          # Set up pages with html, head, body, main, and nextscript
            - faq.js                # Make the FAQ page
            - index.js              # Make the home page
            - login.js              # Make the login form for the user
            - search.js             # Allow users to search tokens and give the latest information with AI
            - settings.js           # Show information for the current user
            - signup.js             # Make the signup form for the user
            - watchlist.js          # Make the watchlist for the user to make records

        - styles                    # styling folder
            - Home.module.css       # styles the main pages
            - globals.css           # styles the global elements

        - validators                # validation folder
            - loginValidator.js     # exports LoginSchema which tells the user if his/her username and password are acceptable when logging up
            - signupValidtor.js     # exports SignupSchema which tells the user if his/her required inputs are filled out and whether if the inputs are acceptable when signing up

    - .eslintrc.json
    - .gitignore                    # gitignore page
    - README.md                     # tells the user how to run on local host
    - jsconfig.json
    - next.config.js
    - package-lock.json
    - package.json
    - vercel.json  





----------------------------------------------

Server
    - dist                         # dist folder
        - main.js                  # main javascript code

    - src                          # src folder
        - controllers              # authentication control folder 
            - authController.js    # handles user signup, login, and signout
            - index.js             # make exports from controllers
            - openController.js    # exports coin descriptions and 

        - models                   # authentication setup folder
             - authSchema.js       # sets up userSchema from mongoose and export it

        - routes                   # page route folder
            - api.router.js        # makes the routes from ..controllers/index.js

        - utils/openai             # ai connection folder
            - openai.config.js     # make configuration
            - openai.js            # export the openaiAPI 

        - index.js                 # runs the server
        - server.js                # sets up the server 


    - .gitignore                   # gitignore page
    - Procfile                     # procfile page
    - package.json                 # packages
    - wepback.config.cjs           # wepback config

```