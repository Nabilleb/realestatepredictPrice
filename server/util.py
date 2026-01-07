import json
import pickle
import numpy as np

__location = None
__data_columns = None
__model = None


def get_estimated_price(location, sqft, bhk, bath):
    global __data_columns, __model

    loc_index = -1
    if location:
        try:
            loc_index = __data_columns.index(location.lower())
        except ValueError:
            loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    # loc_index is an int
    if loc_index >= 0:
        x[loc_index] = 1

    return round(float(__model.predict([x])[0]), 2)


def get_location_names():
    return __location


def load_saved_artifacts():
    print("Loading Saved Artifacts...")
    global __location, __data_columns, __model

    with open(r"./artifacts/columns.json", "r") as f:
        data = json.load(f)

        # If columns.json is {"data_columns":[...]}
        if isinstance(data, dict) and "data_columns" in data:
            __data_columns = data["data_columns"]
        else:
            # If columns.json is just a list [...]
            __data_columns = data

        __location = __data_columns[3:]

    with open(r"./artifacts/model.pkl", "rb") as f:
        __model = pickle.load(f)

    print("Loaded Saved Artifacts...Done")


if __name__ == "__main__":
    load_saved_artifacts()
    tests = [
        ("rajaji nagar", 1000, 2, 2),
        ("whitefield", 1500, 3, 3),
        ("indira nagar", 1200, 2, 2),
        ("electronic city", 1400, 3, 2),
        ("yelahanka", 600, 1, 1),
    ]

    for t in tests:
        print(t[0], "=>", get_estimated_price(*t))

