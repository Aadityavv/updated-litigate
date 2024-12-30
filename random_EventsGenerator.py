import random
import json
from datetime import datetime, timedelta
import uuid

# Function to generate events
def generate_events():
    events = []
    start_date = datetime(2024, 1, 1)
    locations = ["Conference Room A", "Office B", "Training Hall C"]  # Sample locations

    for day in range(365):
        event_date = start_date + timedelta(days=day)
        num_events = random.randint(2, 5)  # Randomize number of events per day (2-5)
        
        for event_num in range(num_events):
            event = {
                "_id": str(uuid.uuid4()),  # Use UUID as a unique identifier
                "eventId": f"E{str(day * 5 + event_num + 1).zfill(5)}",
                "eventName": f"Event {day * 5 + event_num + 1}",
                "eventDate": (event_date + timedelta(hours=random.randint(8, 18))).isoformat() + "Z",
                "location": random.choice(locations),  # Randomize location
                "description": f"Description for Event {day * 5 + event_num + 1}."
            }
            events.append(event)
    return events

# Generate events
events = generate_events()

# Save to events.json
output_file_path = 'events.json'
with open(output_file_path, 'w') as file:
    json.dump(events, file, indent=4)

output_file_path
