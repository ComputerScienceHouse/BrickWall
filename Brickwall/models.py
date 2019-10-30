from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Float
from . import db


class Review(db.Model):
    __tablename__ = "review"
    review_id = Column(Integer, primary_key=True, nullable=False)
    member = Column(String(55), nullable=False, comment="user-name of reviewer")
    type = Column(String(10), nullable=False, comment=\
    """whether the person worked full time or co-op, takes a string, but precondition is it should take 
    one of two strings (\"full-time\" or \"co-op\")""")
    company_id = Column(ForeignKey('company.company_id'), nullable=False, comment = \
    "A reference to the company that the review is about")


class Location(db.model):
    __tablename__ = "location"
    location_id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(256), nullable=False, comment="The name of the location")
    # map_location - TBD


class Interview(db.model):
    __tablename__ = "interview"
    interview_id = Column(Integer, primary_key=True, nullable=False)
    review_id = Column(ForeignKey('review.review_id'), nullable=False)
    interview_count = Column(Integer, default=0, nullable=False, comment=
    "The number of times the person interviewed")
    coding_challenges = Column(Boolean, nullable=False, comment=
     "Whether there were any coding challenges during the interview")
    interview_location = Column(String(55), nullable=False, comment=\
    """whether the interview was on site or remote takes a string, but precondition is it should take one of 
    two strings ("remote", "on-site")""")
    # user comments about the interview
    body = Column(String, nullable=True)


class Company(db.model):
    __tablename__ = "company"
    company_id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(55), nullable=False, comment="The name of the company")
    website = Column(String(256), nullable=True, comment="The companies website")


class Offer(db.model):
    __tablename__ = "offer"
    offer_id = Column(Integer, primary_key=True, nullable=True)
    pay = Column(Float, nullable=False, comment="The amount of money the reviewer was offered")
    pay_type = Column(String(10), nullable=False, comment=
    "takes a string, but precondition is it should take one of two strings (\"salary\", \"hourly\")")
    location = Column(ForeignKey('location.location_id'), nullable=False)
    offer_date = Column(DateTime, nullable=True)
    offer_deadline = Column(DateTime, nullable=True)
    housing = Column(String(10), nullable=False, comment=\
    "takes a string, but precondition is it should take one of two strings (\"stipend\", \"corporate\", \"none\")")
    stipend = Column(Integer, nullable=False)
    # Not sure what this is for
    body = Column(String, nullable=True)


class Job(db.model):
    __tablename__ = "job"
    job_id = Column(Integer, primary_key=True, nullable=False)
    review_id = Column(ForeignKey('review.review_id'), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    body = Column(String, nullable=True)
