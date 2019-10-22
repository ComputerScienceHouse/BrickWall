from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from . import db
from enum import Enum



class Review(db.Model):
    __tablename__ = "review"
    review_id = Column(Integer, primary_key=True, nullable=False)
    # user name of reviewer
    member = Column(String, nullable=False)
    # whether the person worked full time or co-op
    # takes a string, but precondition is it should take one of two strings ("full-time", "co-op")
    type = Column(String, nullable=False)
    company_id = Column(ForeignKey('company.company_id'), nullable=False)

class Location:
    __tablename__ = "location"
    location_id = Column(Integer, primary_key=True, nullable=False)
    # name of the location
    name = Column(String, nullable=False)
    # map_location - TBD

class Interview:
    __tablename__ = "interview"
    interview_id = Column(Integer, primary_key=True, nullable=False)
    review_id = Column(ForeignKey('review.review_id'), nullable=False) 
    # number of times the person interviewed
    interview_count = Column(Integer, default=0, nullable=False)
    # Whether there were any coding challenges during the interview
    coding_challenges = Column(Boolean, nullable=False)
    # whether the interview was on site or remote
    # takes a string, but precondition is it should take one of two strings ("remote", "on-site")
    interview_location = Column(String, nullable=False)
    # user comments about the interview
    body = Column(String, nullable=True)

class Company:
    __tablename__ = "company"
    company_id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    website = Column(String, nullable=True)

class Offer:
    __tablename__ = "offer"
    offer_id = Column(Integer, primary_key=True, nullable=True)
    # review_id
    pay = Column(Integer, nullable= False)
    # takes a string, but precondition is it should take one of two strings ("salary", "hourly")
    pay_type = Column(String, nullable= False)
    # location
    offer_date = Column(DateTime, nullable=True)
    offer_deadline = Column(DateTime, nullable=True)
    # takes a string, but precondition is it should take one of two strings ("stipend", "corporate", "none")
    housing = Column(String, nullable=False)
    stipend = Column(Integer, nullable=False)
    # Not sure what this is for
    body = Column(String, nullable= True)

    
class Job:
    __tablename__ = "job"
    job_id = Column(Integer, primary_key=True, nullable=False)
    review_id = Column(ForeignKey('review.review_id'), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date =  Column(DateTime, nullable=False)
    body = Column(String, nullable=True)
