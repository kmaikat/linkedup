from app.models import db, Post, environment, SCHEMA

def seed_posts():
    post1 = Post(user_id="1", body="This is my first post on here. Looking forward to meeting everyone.")
    post2 = Post(user_id="1", body="I'm bored. Someone hire me.")
    post3 = Post(user_id="2", body="Let's be nice to one another")
    post4 = Post(user_id="2", body="How to use LinkedUp? Connect with everyone!")
    post5 = Post(user_id="3", body="I love Linkedup more than LinkedIn.")

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
