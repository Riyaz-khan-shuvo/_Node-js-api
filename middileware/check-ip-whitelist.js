const cors = require('cors');

let whitelist;

if (process.env.PRODUCTION_BUILD === 'true') {
    whitelist = ['https://esquireelectronicsltd.com', 'https://www.esquireelectronicsltd.com', 'http://localhost:4200'];
} else {
    whitelist = ['http://localhost:4200'];
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(
                new Error('Not allowed by CORS')
            )
        }
    }
}

module.exports = cors(corsOptions);




// const cors = require('cors');

// let whitelist;
// if (process.env.PRODUCTION_BUILD === 'true') {
//     whitelist = ['https://esquireelectronicsltd.com', 'https://www.esquireelectronicsltd.com', 'http://localhost:4200','https://test.esquire.softlabit.com','https://www.test.esquire.softlabit.com'];
// } else {
//     whitelist = ['http://localhost:4200'];
// }

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(
//                 new Error('Not allowed by CORS')
//             )
//         }
//     }
// }

// module.exports = cors(corsOptions);
