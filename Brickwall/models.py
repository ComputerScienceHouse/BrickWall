from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Float
from flask_restplus import fields
from . import db


class Review(db.Model):
    __tablename__ = "review"
    id = Column(Integer, primary_key=True, nullable=False)
    member = Column(String(55), nullable=False, comment="user-name of reviewer")
    type = Column(String(10), nullable=False, comment = 
    """whether the person worked full time or co-op, takes a string, but precondition is it should take 
    one of two strings (\"full-time\" or \"co-op\")""")
    company_id = Column(ForeignKey('company.company_id'), nullable=False, comment=
    "A reference to the company that the review is about")

    def __init__(self, member, review_type, company_id):
        """
        :param member: the name of the CSH member
        :param review_type: whether the person worked full time or co-op, takes a string, but precondition is it should take
        one of two strings (\"full-time\" or \"co-op\"
        :param company_id: The company that the review is associated with (can either be an id or an object)
        """
        self.member = member
        self.type = review_type
        self.company_id = company_id

    @classmethod
    def by_id(cls, id):
        """
        :param id:
        :return: returning the object from the database based on its id
        """
        pass

    @classmethod
    def get_model(cls, api):
        """
        :param api:
        :return: returns the expected format of the input and output JSON
        """
        return api.model('Review', {
            'id': fields.Integer(required=False),
            'member': fields.String(required=True),
            'type': fields.String(required=True),
            'company_id': fields.Integer(required=True)
        })



class Location(db.Model):
    __tablename__ = "location"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(256), nullable=False, comment="The name of the location")
    # map_location - TBD

    def __init__(self, location_name):
        self.name = location_name

    @classmethod
    def by_id(cls, id):
        """
        :param id:
        :return: returning the object from the database based on its location_id
        """
        return cls.query.filter_by(id=id).first()

    @classmethod
    def get_model(cls, api):
        """
        :param api:
        :return: returns the expected format of the input and output JSON
        """
        return api.model('Location', {
            'location_id': fields.Integer(required=False),
            'name': fields.String(required=True),
        })

    def as_dict(self):
        """
        :return: returns the model in the form of a dictionary
        """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Interview(db.Model):
    __tablename__ = "interview"
    id = Column(Integer, primary_key=True, nullable=False)
    review_id = Column(ForeignKey('review.review_id'), nullable=False) 
    interview_count = Column(Integer, default=0, nullable=False, comment = \
    "The number of times the person interviewed")
    coding_challenges = Column(Boolean, nullable=False, comment=\
     "Whether there were any coding challenges during the interview")
    interview_location = Column(String(55), nullable=False, comment=\
    """whether the interview was on site or remote takes a string, but precondition is it should take one of 
    two strings ("remote", "on-site")""")
    # user comments about the interview
    body = Column(String, nullable=True)

    def __init__(self, interview_count, coding_challenges, interview_location, review_id, body):
        self.interview_count = interview_count
        self.coding_challenges = coding_challenges
        self.interview_location = interview_location
        self.review_id = review_id
        self.body = body


class Company(db.Model):
    __tablename__ = "company"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(55), nullable=False, comment="The name of the company")
    website = Column(String(256), nullable=True, comment="The companies website")

    def __init__(self, name, website):
        self.name = name
        self.website = website


class Offer(db.Model):
    __tablename__ = "offer"
    id = Column(Integer, primary_key=True, nullable=True)
    pay = Column(Float, nullable= False, comment= "The amount of money the reviewer was offered")
    pay_type = Column(String(10), nullable= False, comment=\
    "takes a string, but precondition is it should take one of two strings (\"salary\", \"hourly\")")
    location = Column(ForeignKey('location.location_id'), nullable=False)
    offer_date = Column(DateTime, nullable=True)
    offer_deadline = Column(DateTime, nullable=True)
    housing = Column(String(10), nullable=False, comment=\
    "takes a string, but precondition is it should take one of two strings (\"stipend\", \"corporate\", \"none\")")
    stipend = Column(Integer, nullable=False)
    # Not sure what this is for
    body = Column(String, nullable=True)

    def __init__(self, pay, pay_type, location, offer_date, offer_deadline, housing, stipend, body):
        self.pay = pay
        self.pay_type = pay_type
        self.location = location
        self.offer_date = offer_date
        self.offer_deadline = offer_deadline
        self.housing = housing
        self.stipend = stipend
        self.body = body

    
class Job(db.Model):
    __tablename__ = "job"
    id = Column(Integer, primary_key=True, nullable=False)
    review_id = Column(ForeignKey('review.review_id'), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date =  Column(DateTime, nullable=False)
    body = Column(String, nullable=True)

    def __init__(self, start_date, end_date, body):
        self.start_date = start_date
        self.end_date = end_date
        self.body = body
