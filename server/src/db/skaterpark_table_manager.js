const Skatepark = require('../models/skatepark');

Skatepark.selectAll = (con) => {
    return new Promise((resolve, reject) => {
        con.query('Select * from skateparks', (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

Skatepark.getById = (con, id) => {
    return new Promise((resolve, reject) => {
        con.query(
            'Select * from skateparks where SkateparkID = ?',
            [id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(
                    new Skatepark(
                        result[0].Name,
                        result[0].Lon,
                        result[0].Lat,
                        result[0].Address,
                        result[0].Busstop,
                    ),
                );
            },
        );
    });
};

Skatepark.getAllObstaclesFromPark = (con, id) => {
    return new Promise((resolve, reject) => {
        con.query(
            `Select skaterpark_obstacle_connector.ObstacleID 
            from skaterpark_obstacle_connector 
            INNER JOIN skateparks ON skaterpark_obstacle_connector.SkateparkID = skateparks.SkateparkID 
            where skateparks.SkateparkID = ?;`,
            [id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            },
        );
    });
};

Skatepark.getAllPicturesFromPark = (con, id) => {
    return new Promise((resolve, reject) => {
        con.query(
            `select skatepark_pictures.PictureID 
            from skatepark_pictures 
            INNER JOIN skateparks ON skatepark_pictures.SkateparkID = skateparks.SkateparkID 
            where skateparks.SkateparkID = ?;`,
            [id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                var pictures = [];
                for (let i = 0; i < result.length; i++) {
                    pictures[i] = result[i].PictureID;
                }
                var result = Object.assign(result);
                return resolve(pictures);
            },
        );
    });
};

Skatepark.getAvgRating = (con, id) => {
    return new Promise((resolve, reject) => {
        con.query(
            `Select avg(reviews.rating)
            as rating
            from reviews 
            INNER JOIN skateparks ON reviews.SkateparkID = skateparks.SkateparkID 
            where skateparks.SkateparkID = ?;`,
            [id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0].rating);
            },
        );
    });
};
Skatepark.insertValue = (con, skatepark) => {
    return new Promise((resolve, reject) => {
        con.query(
            'Insert into skateparks(Name, Lon, Lat, Address, Busstop) values (?, ?, ?, ?, ?)',
            [
                skatepark.name,
                skatepark.lon,
                skatepark.lat,
                skatepark.address,
                skatepark.busstop,
            ],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            },
        );
    });
};

Skatepark.update = (con, column, newValue, id) => {
    return new Promise((resolve, reject) => {
        con.query(
            `UPDATE Skateparks SET ${column} = ? Where SkateparkID = ? `,
            [newValue, id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result.affectedRows);
            },
        );
    });
};

Skatepark.deleteValue = (con, id) => {
    return new Promise((resolve, reject) => {
        con.query(
            'DELETE FROM skateparks WHERE SkateparkID = ?',
            [id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result.affectedRows);
            },
        );
    });
};

module.exports = Skatepark;
