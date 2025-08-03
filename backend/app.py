from flask import Flask, request, jsonify
from flask_cors import CORS
from connection import db, init_db
from models import DataStructure

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Connect to MySQL
init_db(app)

# Create table if it doesn't exist
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify({"message": "Backend is running with MySQL!"})

@app.route('/data', methods=['GET'])
def get_data():
    data = DataStructure.query.all()
    return jsonify([{
        "id": d.id,
        "data_type": d.data_type,
        "content": d.content
    } for d in data])

@app.route('/data', methods=['POST'])
def add_data():
    data = request.json
    new_data = DataStructure(
        data_type=data['data_type'],
        content=str(data['content'])
    )
    db.session.add(new_data)
    db.session.commit()
    return jsonify({"message": "Data added successfully"})

@app.route('/data/<int:id>', methods=['PUT'])
def update_data(id):
    data = request.json
    existing = DataStructure.query.get(id)
    if not existing:
        return jsonify({"error": "Data not found"}), 404
    existing.data_type = data['data_type']
    existing.content = str(data['content'])
    db.session.commit()
    return jsonify({"message": "Data updated successfully"})

@app.route('/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    existing = DataStructure.query.get(id)
    if not existing:
        return jsonify({"error": "Data not found"}), 404
    db.session.delete(existing)
    db.session.commit()
    return jsonify({"message": "Data deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
