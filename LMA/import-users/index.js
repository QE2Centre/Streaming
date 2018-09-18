/*global require*/
/*global console*/

var PASSWORD = "lma2017",

    fs = require("fs"),
    csv = require("fast-csv"),
    admin = require("firebase-admin"),

    stream = fs.createReadStream("data/delegates.csv"),
    csvStream,
    serviceAccount = require("./firebase-key/streaming-ed3ff-firebase-adminsdk-c7pki-afb106a8eb.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://streaming-ed3ff.firebaseio.com"
});


csvStream = csv()
    .on("data", function (data) {
        var email;
        if (data.length) {
            
            email = data[0].trim();
            
            if (email.indexOf("@") !== -1) {

                // save to Firebase
                admin.auth().createUser({
                    email: email,
                    password: PASSWORD,
                }).then(function (userRecord) {
                    console.log("Success:", email);
                }).catch(function (error) {
                    console.warn("ERROR: ", email);
                    console.log(error);
                });

            } else {
                console.warn("INVALID EMAIL ADDRESS: " + email);
            }

        }
    })
    .on("end", function(){
         console.log("Done");
    });
 
stream.pipe(csvStream);