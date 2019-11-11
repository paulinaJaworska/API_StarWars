import DB.db_vote as db_vote

class VoteProblem(Exception):
    """ If there is problem with voting data"""
    pass


def get_by_planet(planet_name):
    return db_vote.get_data_by_planet(planet_name)


def vote_planet(planet_data):
    return db_vote.add_vote(planet_data)


def get_for_planets():
    return db_vote.count_vote_for_planets()


def get_voted_planets_for_user(username):
    voted_planet = db_vote.find_voted_planet(username)
    if voted_planet['counted'] == None: #
        return None                     #
    return list(voted_planet['counted'])