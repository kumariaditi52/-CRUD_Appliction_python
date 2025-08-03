from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    # MySQL connection for phpMyAdmin
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/crud_db'
    # ↑ Add password if your MySQL root has one → root:password@localhost/crud_db
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return db
