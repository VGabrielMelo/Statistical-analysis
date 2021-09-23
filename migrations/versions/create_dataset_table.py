"""Create dataset table

Revision ID: 6a727cafc4c4
Revises: a1aa31c05042
Create Date: 2021-09-22 20:44:30.450119

"""
from alembic import op
import sqlalchemy


# revision identifiers, used by Alembic.
revision = '6a727cafc4c4'
down_revision = 'a1aa31c05042'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
    "csvs",
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("titulo", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("Path_csv", sqlalchemy.String, nullable=False, unique=True),
)


def downgrade():
    op.drop_table('csvs')
