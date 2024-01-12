import pickle
import joblib
import numpy as np
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app, origins='http://127.0.0.1:5500')

script_directory = os.path.dirname(os.path.realpath(__file__))
model_filename = 'linear_regression_model.pkl'
model_filepath = os.path.join(script_directory, "Train_Model", model_filename)
with open(model_filepath, 'rb') as file:
    theta = pickle.load(file).reshape(1, -1)


@app.route('/predict', methods=['POST'])
def Weather_Forecast():
    data = request.get_json()
    features = np.array(data['PreviousTemp'])
    features = features.reshape(1, -1)
    predict_size = 24  # 24 hours prediction
    prediction = []
    for i in range(0, predict_size):
        value = theta @ np.append(
            np.ones(features.shape[0]).reshape(-1, 1), features, axis=1).T
        prediction.append(value.item())
        features = np.delete(features, 0, axis=1)
        features = np.append(features, value)
        features = features.reshape(1, -1)
    print(prediction)
    return jsonify({'prediction': json.dumps(prediction)})


if __name__ == '__main__':
    app.run(debug=True, port=4350)
