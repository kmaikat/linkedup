from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='User', email='demo@aa.io', password='password', profile_picture='https://www.meme-arsenal.com/memes/49237d810a6fceec65734ec1c346f6ef.jpg', title='Aspiring Software Engineer', bio="Hi everyone! This is my wonderful bio.", city="Austin", state="Texas")
    kelly = User(
        username='kkapoor', first_name="Kelly", last_name="Kapoor", email='kelly@aa.io', password='password', profile_picture='https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-kelly-kapoor.jpg/_jcr_content/renditions/original.JPEG?downsize=1200:*&output-quality=70', title='Customer Service @ Dunder Mifflin"s regional branch', bio='Who says exactly what they"re thinking? What kind of game is that?', city="Scranton", state="Pennsylvania")
    michael = User(
        username='mscott', first_name="Michael", last_name="Scott", email='michael@aa.io', password='password', profile_picture='https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-michael-scott.jpg/_jcr_content/renditions/original.JPEG', title='Regional Manager at Dunder Mifflin Scranton', bio="As the regional manager, I'm responsible for executing sales strategies and marketing as well as logistics and order coordination for all of Northeastern Pennsylvania. Sometimes, I do improv for fun.", city="Scranton", state="Pennsylvania")
    jim = User(
        username='jhalpert', first_name="Jim", last_name="Halpert", email='jim@aa.io', password='password', profile_picture='https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-jim-halpert.jpg/_jcr_content/renditions/original.JPEG?downsize=1200:*&output-quality=70', title='Founder at Athlead', bio="I love to play pranks, so you better watch out.", city="Scranton", state="Pennsylvania")

    db.session.add(demo)
    db.session.add(kelly)
    db.session.add(michael)
    db.session.add(jim)
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
