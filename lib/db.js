const pg = require('pg');
//
var config={
    user:'webuser',
    database:'welcomeapp',
    password:'Welcome123',
    host:'localhost',
    port:5432,
    max:10,
    idleTimeoutMillis:30000,
};

const pgPool = new pg.Pool(config);

pgPool.on('error', function(err,client){
    console.error('idle client error', err.message, err.stack);
});

module.exports.query = function(text, values, callback){
    console.log('query:', text, values);
    return pgPool.query(text, values, callback);
};



/*
module.exports.sync_query = function(text, values, callback){
    //
    // return pgPool.connect().then(client => {
    //     client.query(text, values).then(res => {
    //     console.log("<:query has been executed:>");
    //     //callback(res);
    //     client.release();
    //     callback(res);
    //   })
    //   .catch(e => {
    //      client.release()
    //      console.error('query error', e.message, e.stack)
    //   })
    // });
    //
    pgPool.connect().then(client => {
        client.query(text, values).then(res => {
        console.log("<:query has been executed:>");
        //callback(res);
        client.release();
        callback(res);
      })
      .catch(e => {
         client.release()
         console.error('query error', e.message, e.stack)
      })
    });
    //
};




module.exports.connect = function(callback) {
    return pgPool.connect(callback);
};
*/
