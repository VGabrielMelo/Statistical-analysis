"""Create user table

Revision ID: a1aa31c05042
Revises: 
Create Date: 2021-09-22 11:52:23.454097

"""
from alembic import op
import sqlalchemy


# revision identifiers, used by Alembic.
revision = 'a1aa31c05042'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
    "user",
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("nome", sqlalchemy.String),
    sqlalchemy.Column("email", sqlalchemy.String, unique=True),
    sqlalchemy.Column("senha", sqlalchemy.String),
    sqlalchemy.Column("perfil", sqlalchemy.String),
)


def downgrade():
    op.drop_table('user')
