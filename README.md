# LabelLab

## User Guide

#### How to Setup

Clone the repository.

`git clone https://github.com/Tushar19varshney/Labellab.git`

Change directry to the folder.

`cd labellab/`

#### Set up react server

Run npm install in labellab-client folder.

```
 cd labellab-client/
 npm install
 ```
    
#### How to Use

Use two terminals, one for labellab-server and the other for labellab-client.

Run the Node server in the labellab-server folder:
    
`$ npm start`

Run the Nodemon server in the labellab-server folder:

`$ npm run dev `

start the npm server in labellab-client directory.

`npm start`

And use [localhost:3000](https://) to browse.


> **NOTE**: This version is only supporting for Chrome browser. And make sure to instal the extension -> Redux Dev Tools in chrome extension library.


#### Running with Docker

1. Change the MongoDB url to user local mongodb database url in *Labellab/labellab-server/config/db_uri.js*.
2. In the root of the project directory, run `docker-compose build`
   - If you are on Linux machine, execute the following steps to install compose. 
     ```
     sudo curl -L https://github.com/docker/compose/releases/download/1.17.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
     sudo chmod +x /usr/local/bin/docker-compose
     ```
3. Once build completes, run `docker-compose up`
