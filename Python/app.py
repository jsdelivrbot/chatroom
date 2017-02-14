from flask import Flask, request, json
from flask_sqlalchemy import SQLAlchemy
from time import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enables CORS for all domains on all routes to allow local testing
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'  # set database location locally
db = SQLAlchemy(app)


class ChatroomMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(20))
    message = db.Column(db.String(140))
    timestamp = db.Column(db.Integer, default=time)

    def __init__(self, user_name, message):
        # id takes care of itself due to primary_key
        self.user_name = user_name
        self.message = message

    def __repr__(self):
        return 'MESSAGE: ' + self.message + ' from: ' + self.user_name + ' at: ' + self.timestamp


@app.route('/post_message', methods=['POST'])
def create_message():
    message_dict = request.get_json()  # grab the posted data
    new_message = ChatroomMessage(message_dict['user_name'], message_dict['message'])  # create a new message
    db.session.add(new_message)  # add to the database
    db.session.commit()

    return "Message posted", 201  # message successfully created


@app.route('/get_recent_messages', methods=['GET'])
def fetch_recent_messages():
    recent_messages = []
    # query the database for the most recent 15 messages, ordered by their timestamp
    messages_array = ChatroomMessage.query.order_by(ChatroomMessage.timestamp.desc()).limit(15)
    # these contain all the junk that is on the db.Model object -- we are only interested in message/user_name/timestamp
    for message_object in messages_array:
        a_message = {'user_name': message_object.user_name, 'message': message_object.message,
                     'timestamp': message_object.timestamp}
        recent_messages.append(a_message)

    recent_messages.reverse()  # reverse the message order so they will display from bottom-up in React application
    return json.dumps(recent_messages)  # send them over as json


if __name__ == '__main__':
    app.run()

