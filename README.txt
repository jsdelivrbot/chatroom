README.txt

Instructions:

Open two terminals

In the first:
$ cd Chatroom/Python

Create and run a virtual environment, and download the dependencies like so:
$ virtualenv venv
$ source venv/bin/activate
$ pip install -r requirements.txt

NOTE: if you do not have virtualenv, it can be installed globally by:
$ pip install virtualenv

Begin a python instance in this same terminal with:
$ venv/bin/python

Create the database
>>> from app import db
>>> db.create_all()

The creation can be verified by entering into another terminal:
$ cat /tmp/test.db

End the python instance with 
Cntrl-D

Start the application with:
$ python app.py


REACT

In the second terminal:
$ cd Chatroom/React

Download the dependencies:
$ yarn add package.json 

NOTE: if you do not have yarn, it can be installed with brew:
$ brew update
$ brew install yarn

Start the server:
$ yarn start

In a web browser, navigate to:
localhost:8080

Enter a message into the bottom field, hit ENTER to send (NOTE: It may take a few moments for the first message to send, not sure why)