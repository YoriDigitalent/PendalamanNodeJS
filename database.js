import sqlite from 'sqlite3'

//export.initDatabase
export function initDatabase() {
    return new sqlite.Database('data',(err) => {
        if (err) {
            throw err
        }

        console.log('Init DB Success')
    } )

}

/**
 * 
 * @param {sqlite.Database} db 
 */
export function initTable(db) {
    db.serialize(() => {
        db.run (`CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            photo TEXT NOT NULL,
            name VARCHAR(56) NOT NULL,
            price INTEGER NOT NULL
        );`)
    })
}

/**
 * 
 * @param {sqlite.Database} db 
 * @param {string} name 
 * @param {number} price 
 * @param {string} photo 
 */
export function insertProduct(db, name, price, photo) {
    db.run(`INSERT INTO product (photo,name,price) VALUES ($photo, $name, $price`, { name, price, photo }, (err) => {
      if(err) {
        console.log(err)
        throw err
      }

      console.log('product saved')
    })
  }


/**
 * 
 * @param {sqlite.Database} db 
 */
export function getProduct(db) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM product`, (err, results) => {
            if (err) {
            reject (err)    
            }

        console.log('Query Results', results)
        resolve(results)

    })

})
}