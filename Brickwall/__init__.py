from flask import Flask, request
from flask_restplus import Api, Resource, fields
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Load default configuration and any environment variable overrides
_root_dir = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
app.config.from_pyfile(os.path.join(_root_dir, 'config.env.py'))

# Load file based configuration overrides if present
_pyfile_config = os.path.join(_root_dir, 'config.py')
if os.path.exists(_pyfile_config):
    app.config.from_pyfile(_pyfile_config)

api = Api(app=app,
          version="0.0",
          title="BrickWall",
          description="The Backend of the BrickWall Web App")
v1 = api.namespace('api/v1', description='v1 APIs')
db = SQLAlchemy(app)

from Brickwall.models import *
db.create_all()

location_model = api.model('Location', {
    'name': fields.String
})

review_model = api.model('Review', {
    'member': fields.String,
    'type': fields.String,
    'company_id': fields.Integer
})

company_model = api.model('Company', {
    'name': fields.String,
    'website': fields.String
})


@v1.route('/location/<location_id>')
class LocationRoutes(Resource):
    def get(self, location_id):
        retrieved_location = Location.query.filter_by(id=location_id).first()
        return {
            "id": location_id,
            "name": retrieved_location.name
            }

    @api.expect(location_model)
    def post(self, location_id):
        req_data = request.get_json()
        retrieved_location = Location.query.filter_by(id=location_id).first()
        retrieved_location.name = req_data["name"]
        db.session.commit()

    def delete(self, location_id):
        retrieved_location = Location.query.filter_by(id=location_id).first()
        db.session.delete(retrieved_location)
        db.session.commit()
        return {'success': True}


@v1.route('/location')
class CreateLocationRoutes(Resource):

    @api.expect(location_model)
    def put(self):
        req_data = request.get_json()
        location = Location(req_data["name"])
        db.session.add(location)
        db.session.commit()
        return {"id" : location.id, "name": location.names}


@v1.route('/person/<username>')
class PersonRoutes(Resource):
    def get(self, username):
        return {"person": username}


@v1.route('/company/<company_id>')
class CompanyRoutes(Resource):

    def get(self, company_id):
        retrieved_company = Company.query.filter_by(id=company_id).first()
        return {
            "id": retrieved_company.id,
            "name": retrieved_company.name,
            "website": retrieved_company.website
        }

    @api.expect(company_model)
    def post(self, company_id):
        req_data = request.get_json()
        retrieved_company = Company.query.filter_by(id=company_id).first()
        retrieved_company.name = req_data['name']
        retrieved_company.website = req_data['website']
        db.session.commit()
        return {
            "id": retrieved_company.id,
            "name": retrieved_company.name,
            "website": retrieved_company.website
        }

    def delete(self, company_id):
        req_data = request.get_json()
        retrieved_company = Company.query.filter_by(id=company_id).first()
        db.session.delete(retrieved_company)
        db.session.commit()
        return {'success': True}


@v1.route('/company/')
class CreateCompanyRoutes(Resource):
    @api.expect(company_model)
    def put(self):
        req_data = request.get_json()
        new_company = Company(req_data['name'], req_data['website'])
        db.session.add(new_company)
        db.session.commit()
        return {
            "id": new_company.id,
            "name": new_company.name,
            "website": new_company.website
        }


@v1.route('/review/<review_id>')
class ReviewRoutes(Resource):

    def get(self, company_id, review_id):
        retrieved_review = Review.query.filter_by(id=review_id)
        return {
            "id": retrieved_review.id,
            "member": retrieved_review.member,
            "type": retrieved_review.type,
            "company_id": retrieved_review.company_id
        }

    @api.expect(review_model)
    def post(self, review_id):
        req_data = request.get_json()
        retrieved_review = Review.query.filter_by(id=review_id).first()
        retrieved_review.member = req_data["member"]
        retrieved_review.type = req_data["type"]
        retrieved_review.company_id = req_data["company_id"]
        return {
            "id": retrieved_review.id,
            "member": retrieved_review.member,
            "type": retrieved_review.type,
            "company_id": retrieved_review.company_id
        }

    def delete(self, review_id):
        retrieved_review = Review.query.filter_by(id=review_id).first()
        db.session.delete(retrieved_review)
        db.session.commit()
        return {
            "success": True
        }


@v1.route('/review/')
class CreateReviewRoutes(Resource):

    @api.expect(review_model)
    def put(self):
        req_data = request.get_json()
        new_review = Review(req_data["member"], req_data["type"], req_data["company_id"])
        db.session.add(new_review)
        db.session.commit()
        return {
            "id": new_review.id,
            "member": new_review.member,
            "type": new_review.type,
            "company_id": new_review.company_id
        }
