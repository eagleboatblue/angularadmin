import sqlite3
import uuid

database = 'mydb.db'

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    return conn


def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

sql_create_events_table = """ CREATE TABLE IF NOT EXISTS events (
                                    id text PRIMARY KEY,
                                    title text NOT NULL,
                                    begin_date text,
                                    end_date text,
                                    theday text
                                ); """

def table():
    conn = create_connection(database)
    if conn is not None:
        create_table(conn, sql_create_events_table)
    else:
        print("Error: cannot create the database connection.")
    conn.close()

def addEvents():
    conn = create_connection(database)
    c = conn.cursor()
    try:
        events = [
            (uuid.uuid4().hex, 'Vacation', '2020-08-02', '2020-08-07', None),
            (uuid.uuid4().hex, 'Sick Day', '2020-08-11', '2020-08-13', None),
            (uuid.uuid4().hex, 'Production Final', None, None, '2020-08-31'),
        ]
        c.executemany('INSERT INTO events VALUES (?,?,?,?,?)', events)
        conn.commit()
    except Exception as err:
        print("Error: ", err)
    conn.close()

def getEvents():
    conn = create_connection(database)
    c = conn.cursor()
    events = []
    for row in c.execute('select * from events'):
        event = {
            'id': row[0],
            'title': row[1],
            'start': row[2],
            'end': row[3],
            'date': row[4],
        }
        events.append(event)
    conn.close()
    return events

def main():
#    table()
#    addEvents()
    getEvents()

if __name__ == '__main__':
    main()
    print('Done.')