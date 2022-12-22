from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='User', email='demo@aa.io', password='password', title='Aspiring Software Engineer', bio="Hi everyone! This is my wonderful bio.", city="Austin", state="Texas")
    marnie = User(
        username='marnie', first_name="Marnie", last_name="Barney", email='marnie@aa.io', password='password', title='Aspiring Dancer', bio="Hi everyone! I'm open to network.", city="Austin", state="Texas")
    bobbie = User(
        username='bobbie', first_name="Bob", last_name="Bobbie", email='bobbie@aa.io', password='password', title='Aspiring Comedian', bio="Hi everyone! You like my bio?", city="Austin", state="Texas")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
