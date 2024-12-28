import json
import random
from datetime import datetime, timedelta

# Generate random cases
def generate_cases(num_cases):
    statuses = ["Pending", "Resolved", "Closed", "Active"]
    case_types = ["Corporate Merger", "Property Dispute", "Intellectual Property", "Contract Breach", "Family Law"]
    lawyers = ["Alice Smith", "Bob Johnson", "Emily Davis", "John Doe", "Michael Brown"]
    clients = ["Acme Corp", "Global Tech", "XYZ Ltd", "ABC Inc", "John Roe"]
    titles = [
        "Johnson LLC Merger",
        "Property Settlement",
        "Intellectual Property Dispute",
        "Contract Breach Litigation",
        "Family Dispute Resolution",
    ]

    cases = []
    for i in range(1, num_cases + 1):
        random_status = random.choice(statuses)
        random_case_type = random.choice(case_types)
        random_lawyer = random.choice(lawyers)
        random_client = random.choice(clients)
        random_title = random.choice(titles)
        random_deadline = datetime.now() + timedelta(days=random.randint(-365, 365))

        case = {
            "caseId": f"C{i:05}",
            "title": random_title,
            "clientName": random_client,
            "contactInfo": {
                "email": f"{random_client.lower().replace(' ', '')}@example.com",
                "phone": f"555-{random.randint(1000000, 9999999)}",
            },
            "caseType": random_case_type,
            "description": f"Legal consultation for {random_case_type.lower()} proceedings.",
            "assignedTo": random_lawyer,
            "status": random_status,
            "deadline": random_deadline.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            "notes": [
                {
                    "date": (datetime.now() - timedelta(days=random.randint(1, 365))).strftime("%Y-%m-%d"),
                    "content": "Initial consultation completed."
                },
                {
                    "date": (datetime.now() - timedelta(days=random.randint(1, 365))).strftime("%Y-%m-%d"),
                    "content": "Case documents reviewed."
                }
            ],
            "documents": [
                {"fileName": "Complaint.pdf", "category": "Pleadings"},
                {"fileName": "Contract_Agreement.pdf", "category": "Contracts"}
            ]
        }

        cases.append(case)

    return cases

# Generate 100 cases
num_cases = 100
cases = generate_cases(num_cases)

# Save to a JSON file
with open("cases.json", "w") as f:
    json.dump(cases, f, indent=2)

print(f"{num_cases} cases generated and saved to cases.json")
