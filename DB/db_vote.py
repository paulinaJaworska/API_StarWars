import DB.db_connection as db_connection


@db_connection.connection_handler
def get_data_by_planet(cursor, planet_name):
    cursor.execute("""
            SELECT * FROM planet_votes
            WHERE planet_name = %(planet_name)s
    """, {'planet_name': planet_name})
    planet_info = cursor.fetchone()
    return planet_info


@db_connection.connection_handler
def add_vote(cursor, planet_data):
    cursor.execute("""
            INSERT INTO planet_votes(planet_id, planet_name, user_id, submission_time)
            VALUES (%(planet_id)s, %(planet_name)s, %(user_id)s, DATE_TRUNC('minute', now()))
            RETURNING planet_name
    """, {'planet_id': planet_data['planet_id'],
          'planet_name': planet_data['planet_name'],
          'user_id': planet_data['user_id']})
    planet_name = cursor.fetchone()
    return planet_name


@db_connection.connection_handler
def count_vote_for_planets(cursor):
    cursor.execute("""
    SELECT planet_name, count(planet_name) FROM planet_votes
    GROUP BY planet_name""")
    planet_votes = cursor.fetchall()
    return planet_votes


@db_connection.connection_handler
def find_voted_planet(cursor, username):
    cursor.execute("""
            SELECT array_agg(planet_id) as counted FROM planet_votes
            JOIN users u on planet_votes.user_id = u.id
            WHERE u.username = %(username)s
    """, {'username': username})
    voted_planets = cursor.fetchone()
    return voted_planets