from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    comments = [
        {
            "user_id": 2,
            "post_id": 1,
            "body": "Nice to meet you!"
        },
        {
            "user_id": 3,
            "post_id": 1,
            "body": "Welcome! 🥳"
        },
        {
            "user_id": 3,
            "post_id": 1,
            "body": "You better comment and interact with me! 🥺👹"
        },
        {
            "user_id": 2,
            "post_id": 1,
            "body": "Who invited this weirdo.."
        },
        {
            "user_id": 2,
            "post_id": 2,
            "body": "Not with that tone. Yikes. 😬"
        },
        {
            "user_id": 3,
            "post_id": 2,
            "body": "Don't be rude..."
        },
        {
            "user_id": 2,
            "post_id": 2,
            "body": "I'm not. Just stating facts. 🥴💯"
        },
        {
            "user_id": 3,
            "post_id": 2,
            "body": "🙄"
        },
        {
            "user_id": 3,
            "post_id": 3,
            "body": "Haha. Funny you said that."
        },
        {
            "user_id": 1,
            "post_id": 3,
            "body": "You two... watch this become a enemies to lovers soap trope. I def ship this."
        },
        {
            "user_id": 2,
            "post_id": 3,
            "body": "No way. This is a networking site not a DATING site. 🤢🤮"
        },
        {
            "user_id": 3,
            "post_id": 3,
            "body": "Want to grab coffee next Friday?"
        },
        {
            "user_id": 2,
            "post_id": 3,
            "body": "I could go for coffee, how about boba instead? There's a new place in town. 🧋"
        },
        {
            "user_id": 3,
            "post_id": 3,
            "body": "I'll pick you up at 3."
        },
        {
            "user_id": 1,
            "post_id": 3,
            "body": "YA'LL."
        },
        {
            "user_id": 1,
            "post_id": 3,
            "body": "Ever heard of private messages? 🤧"
        },
    ]

    for comment in comments:
        comment_seed = Comment(
            user_id=comment["user_id"],
            post_id=comment["post_id"],
            body=comment["body"]
        )
        db.session.add(comment_seed)

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
