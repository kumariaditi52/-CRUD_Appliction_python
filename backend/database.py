from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    # SQLite database file (saved in backend folder)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///crud_db.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return db
