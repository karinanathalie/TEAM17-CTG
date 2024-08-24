import sqlite3
import csv

# Connect to the SQLite database
conn = sqlite3.connect('your_database_name.db')
cursor = conn.cursor()

# Specify the table name you want to export
table_name = 'your_table_name'

# Execute a query to select all data from the table
cursor.execute(f"SELECT * FROM {table_name}")

# Fetch all rows from the executed query
rows = cursor.fetchall()

# Get the column names from the cursor
column_names = [description[0] for description in cursor.description]

# Define the CSV file name
csv_file_name = f"{table_name}.csv"

# Open the CSV file for writing
with open(csv_file_name, mode='w', newline='') as file:
    writer = csv.writer(file)

    # Write the column names as the first row
    writer.writerow(column_names)

    # Write all rows from the table
    writer.writerows(rows)

# Close the database connection
conn.close()

print(f"Table {table_name} has been exported to {csv_file_name}")