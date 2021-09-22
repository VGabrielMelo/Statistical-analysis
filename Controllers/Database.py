import databases
import sqlalchemy
from starlette.config import Config
from starlette.responses import JSONResponse


# Configuration from environment variables or '.env' file.
config = Config('.env')
DATABASE_URL = config('DATABASE_URL')

# Database table definitions.
metadata = sqlalchemy.MetaData()

csvs = sqlalchemy.Table(
    "csvs",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("Título", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("csv", sqlalchemy.Binary, nullable=False),
)

user = sqlalchemy.Table(
    "user",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("nome", sqlalchemy.String),
    sqlalchemy.Column("email", sqlalchemy.String, unique=True),
    sqlalchemy.Column("senha", sqlalchemy.String),
    sqlalchemy.Column("perfil", sqlalchemy.String),
)

database = databases.Database(DATABASE_URL)

def retornar_database():
    return database