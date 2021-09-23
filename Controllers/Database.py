import databases
import sqlalchemy
from starlette.config import Config

# Configuration from environment variables or '.env' file.
config = Config('.env')
DATABASE_URL = config('DATABASE_URL')

# Database table definitions.
metadata = sqlalchemy.MetaData()

dataset = sqlalchemy.Table(
    "dataset",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("titulo", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("Path_dataset", sqlalchemy.String, nullable=False),
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
