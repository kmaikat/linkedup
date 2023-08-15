from .db import db, add_prefix_for_prod

likes = db.Table(
    "likes",
    db.Column("user_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")
    )),
    db.Column("post_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("posts.id")
    ))
)
