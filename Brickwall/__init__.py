from flask import Flask
from flask_restplus import Api, Resource, fields

flask_app = Flask(__name__)
app = Api(app = flask_app,
    version="0.0",
    title= "Brickwall",
    description="The Backend of the Brickwall webapp")

name_space = app.namespace('main', description='Main APIs')

@name_space.route('/api/v1/location/<location_id>')
class Location(Resource):
    def get(self, location_id):
        print("location get")
        return {"location": location_id}
    def post(self, location_id):
        print("Location put")
    def put(self):
        print("Location put")
    def delete(self):
        print("Location delete")

     

@name_space.route('/api/vi/person<username>')
class Person(Resource):
    def get(self, username):
        return {"person": username}

@name_space.route('/api/v1/company/<company_id>')   
class Company(Resource):
    def get(self, company_id):
        return {"company_id": company_id}
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass

@name_space.route('/api/v1/company/<company_id>/<review_id>')
class Review(Resource):
    def get(self, company_id, review_id):
        return  {"review id": review_id, "company_id": company_id}
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass
