db.createUser({
    user: "rayhankinan",
    pwd: "password",
    roles: [
        {
            role: "readWrite",
            db: "mern",
        },
    ],
});
