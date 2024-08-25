from enum import Enum

class RoleType(Enum):
    STAFF = 'staff'
    VOLUNTEER = 'volunteer'
    PARTICIPANT = 'participant'

    @classmethod
    def choices(cls):
        return [(key.name, key.value) for key in cls]

class Gender(Enum):
    MALE = 'male'
    FEMALE = 'female'
    
    @classmethod
    def choices(cls):
        return [(key.name, key.value) for key in cls]


class Status(Enum):
    SUCCESSFUL = 'successful'
    PENDING = 'pending'
    UNSUCCESSFUL = 'unsuccessful'
    
    @classmethod
    def choices(cls):
        return [(key.name, key.value) for key in cls]