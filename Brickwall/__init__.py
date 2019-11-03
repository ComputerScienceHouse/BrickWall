from flask import Flask, request
from flask_restplus import Api, Resource, fields
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
api = Api(app=app,
    version="0.0",
    title="BrickWall",
    description="The Backend of the BrickWall Web App")
v1 = api.namespace('api/v1', description='v1 APIs')
db = SQLAlchemy(app)

from Brickwall.models import Location, Company


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
        retrieved_location = Location.query.filter_by(location_id=location_id).first()
        print(retrieved_location)
        return {"location": location_id}

    def put(self):
        print("Location put")

    def delete(self, location_id):
        print("Location delete")


@v1.route('/location')
class CreateLocationRoutes(Resource):
    # put creates, post modifies
    @api.expect(location_model)
    def put(self):
        req_data = request.get_json()
        location = Location(req_data["name"])
        db.session.add(location)
        db.session.commit()


@v1.route('/person/<username>')
class PersonRoutes(Resource):

    def get(self, username):
        return {"person": username}


@v1.route('/company/<company_id>')
class CompanyRoutes(Resource):

    def get(self, company_id):
        return {"company_id": company_id}

    def post(self):
        req_data = request.get_json()
        company = Company(req_data["company_name"], req_data["website"])

    def delete(self):
        pass

@v1.route('/company/')
class CreateCompanyRoutes(Resource):
    @api.expect(company_model)
    def put(self):
        pass


@v1.route('/company/<company_id>/<review_id>')
class ReviewRoutes(Resource):

    def get(self, company_id, review_id):
        return {"review id": review_id, "company_id": company_id}

    def post(self):
        pass

    def delete(self):
        pass

@v1.route('/company/<company_id>')
class CreateReviewRoutes(Resource):
    @api.expect(review_model)
    def put(self):
        pass



