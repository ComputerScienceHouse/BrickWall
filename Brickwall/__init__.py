from flask import Flask
from flask_restplus import Api, Resource

app = Flask(__name__)
app = Api(app = app)

name_space = app.namespace('main', description='Main APIs')

@name_space.route('/api/v1/location<location_id>', methods = ['GET, POST, PUT, DELE'])
def location():
    return "Hello World"