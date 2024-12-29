import json
import random
from datetime import datetime, timedelta

# Generate a random date
def random_date(start_year=2020, end_year=2025):
    random_year = random.randint(start_year, end_year)
    random_month = random.randint(1, 12)
    random_day = random.randint(1, 28)  # To avoid issues with February and leap years
    random_hour = random.randint(0, 23)
    random_minute = random.randint(0, 59)
    random_second = random.randint(0, 59)
    random_microsecond = random.randint(0, 999999)
    return datetime(
        random_year, random_month, random_day, random_hour, random_minute, random_second, random_microsecond
    )

# Generate random notifications
def generate_notifications(num_notifications):
    notifications = []
    for i in range(1, num_notifications + 1):
        notification = {
            "notificationId": f"N{i:05}",
            "title": f"Notification Title {i}",
            "description": f"This is the description for notification {i}.",
            "date": random_date().strftime("%Y-%m-%dT%H:%M:%S.%fZ"),  # Random date with random year and month
        }
        notifications.append(notification)
    return notifications

# Generate random events
def generate_events(num_events):
    event_locations = ["Conference Room A", "Office B", "Virtual Zoom Meeting", "Courtroom 1", "Main Hall"]
    event_descriptions = [
        "Meeting to discuss case updates.",
        "Workshop on legal strategy.",
        "Client consultation session.",
        "Review of pending cases.",
        "Training session on legal software.",
    ]

    events = []
    for i in range(1, num_events + 1):
        event_date = random_date()  # Random date with random year and month
        event = {
            "eventId": f"E{i:05}",
            "eventName": f"Event {i}",
            "eventDate": event_date.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            "location": random.choice(event_locations),
            "description": random.choice(event_descriptions),
        }
        events.append(event)
    return events

# Number of notifications and events to generate
num_notifications = 100
num_events = 100

# Generate and save notifications
notifications = generate_notifications(num_notifications)
with open("notifications.json", "w") as f:
    json.dump(notifications, f, indent=2)

print(f"{num_notifications} notifications generated and saved to notifications.json")

# Generate and save events
events = generate_events(num_events)
with open("events.json", "w") as f:
    json.dump(events, f, indent=2)

print(f"{num_events} events generated and saved to events.json")
