import time

def perform_task():
    # Your task goes here
    print("Task is being performed.")
    # For example, you might call an API, update a database, etc.
    
# Infinite loop
while True:
    perform_task()
    # Sleep for 12 hours (12 * 60 * 60 seconds)
    time.sleep(12 * 60 * 60)