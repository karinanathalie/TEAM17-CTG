import sqlite3

def event_check():
    # Connect to the SQLite database
    conn = sqlite3.connect('/Users/elizalesmana/Documents/GitHub/TEAM17-CTG/backend_dev/ctg17/db.sqlite3')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM api_event")
    rows = cursor.fetchall()

    txt_file_name = f"/Users/elizalesmana/Documents/GitHub/TEAM17-CTG/update_rag/info_file/api_event.txt"

    with open(txt_file_name, mode='w') as file:
        for row in rows:
            event_id, event_name, event_description, event_date, event_location, event_image, target_population, skillset, participant_quota, volunteer_quota, deadline = row

            file.write(f"{event_name} is about {event_description}. The date is {event_date} at {event_location}. "
                    f"Target population is {target_population}. Skillset required: {skillset}. "
                    f"Participant quota: {participant_quota}, Volunteer quota: {volunteer_quota}. "
                    f"Deadline for registration: {deadline}.\n")

    conn.close()

    print(f"Table has been exported to {txt_file_name.split('/')[-1]}")
