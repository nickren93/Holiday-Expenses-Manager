"""add year column to Holiday (SQLite-safe)

Revision ID: add_year_manual
Revises: bb82b25733e7
Create Date: 2025-11-30
"""

from alembic import op
import sqlalchemy as sa


# Alembic identifiers
revision = 'add_year_manual'
down_revision = 'bb82b25733e7'
branch_labels = None
depends_on = None


def upgrade():

    # 1. Add column with temporary DEFAULT (SQLite requires it)
    with op.batch_alter_table("holidays") as batch_op:
        batch_op.add_column(
            sa.Column(
                "year",
                sa.Integer(),
                server_default="2020",   # temporary required for SQLite
                nullable=False
            )
        )

    # 2. Remove default after creation (optional but clean)
    with op.batch_alter_table("holidays") as batch_op:
        batch_op.alter_column("year", server_default=None)


def downgrade():
    with op.batch_alter_table("holidays") as batch_op:
        batch_op.drop_column("year")
