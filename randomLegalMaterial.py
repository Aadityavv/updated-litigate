import random
import string
from datetime import datetime, timedelta
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["litigate"]  
collection = db["legal_materials"]

# Generate random string
def random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Generate random category
def random_category():
    categories = ["Law", "Case Study", "Article", "Statute"]
    return random.choice(categories)

# Generate random date within the last year
def random_date():
    start_date = datetime.now() - timedelta(days=365)
    random_days = random.randint(0, 365)
    return start_date + timedelta(days=random_days)

# Generate random URL
def random_url():
    return f"https://www.example.com/{random_string(10)}"

# Create 100 random data samples
data_samples = []
for _ in range(100):
    sample = {
        "title": random_string(15),
        "description": random_string(50),
        "category": random_category(),
        "date": random_date(),
        "link": random_url(),
    }
    data_samples.append(sample)

# Insert data into MongoDB
result = collection.insert_many(data_samples)

print(f"Inserted {len(result.inserted_ids)} documents into MongoDB.")
