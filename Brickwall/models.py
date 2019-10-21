from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from . import db
from enum import Enum



class Review(db.Model):
    __tablename__ = "review"
    review_id = Column(Integer, primary_key=True)
    # user name of reviewer
    member = Column(String)
    # whether the person worked full time or co-op
    # takes a string, but precondition is it should take one of two strings ("full-time", "co-op")
    type = Column(String)
    company_id = Column(ForeignKey('company.company_id'))

class Location:
    __tablename__ = "location"
    location_id = Column(Integer, primary_key=True)
    # name of the location
    name = Column(String)
    # map_location - TBD

class Interview:
    __tablename__ = "interview"
    interview_id = Column(Integer, primary_key=True)
    review_id = Column(ForeignKey('review.review_id')) 
    # number of times the person interviewed
    interview_count = Column(Integer, default=0)
    # Whether there were any coding challenges during the interview
    coding_challenges = Column(Boolean)
    # whether the interview was on site or remote
    # takes a string, but precondition is it should take one of two strings ("remote", "on-site")
    interview_location = Column(String)
    # user comments about the interview
    body = Column(String)

class Company:
    __tablename__ = "company"
    company_id = Column(Integer, primary_key=True)
    name = Column(String)
    website = Column(String)

class Offer:
    __tablename__ = "offer"
    offer_id = Column(Integer, primary_key=True)
    # review_id
    pay = Column(Integer)
    # takes a string, but precondition is it should take one of two strings ("salary", "hourly")
    pay_type = Column(String)
    # location
    offer_date = Column(DateTime)
    offer_deadline = Column(DateTime)
    # takes a string, but precondition is it should take one of two strings ("stipend", "corporate", "none")
    housing = Column(String)
    stipend = Column(Integer)
    # Not sure what this is for
    body = Column(String)

    
class Job:
    __tablename__ = "job"
    job_id = Column(Integer, primary_key=True)
    review_id = Column(ForeignKey('review.review_id'))
    start_date = Column(DateTime)
    end_date =  Column(DateTime)
    body = Column(String)
