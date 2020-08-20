from flask import Flask, request, jsonify
from flask_cors import CORS
from mydb import getEvents

# instantiate the app
app = Flask(__name__)
CORS(app)
app.config.from_object(__name__)

@app.route('/ping', methods=['GET'])
def ping_pong():
    return 'pong!'

@app.route('/events', methods=['GET'])
def all_events():
    response_object = {'status': 'success'}
    events = getEvents()
    print(events)
    response_object['events'] = events
    return jsonify(response_object)

if __name__ == '__main__':
    app.debug = True
    app.run(host="localhost", port=5000)