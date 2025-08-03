from connection import db

class DataStructure(db.Model):
    __tablename__ = "data_structure"
    id = db.Column(db.Integer, primary_key=True)
    data_type = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
