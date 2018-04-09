var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var url = 'mongodb://localhost:27017/videos';

exports.connexionMongo = function(callback) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		callback(err, db);
	});
}

exports.findVideos = function(page, pagesize, callback) {

	   MongoClient.connect(url, function(err, db) {
		const myDb = db.db('videos');
    	    console.log("pagesize = " + pagesize);
    	    console.log("page = " +   
			db.collection('videos')
            .find()
            .skip(page*pagesize)
            .limit(pagesize)
            .toArray());

        if(!err){
            db.collection('videos')
            .find()
            .skip(page*pagesize)
            .limit(pagesize)
            .toArray()
            .then(arr => callback(arr));
        }
        else{
            callback(-1);
        }
    });
};

exports.findVideoById = function(id, callback) {
    MongoClient.connect(url, function(err, db) {
		
        if(!err) {
        	// La requete mongoDB

            let myquery = { "_id": ObjectId(id)};

            db.collection("videos") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        restaurant : data,
                        error : null,
                        msg:"Details du la video envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        restaurant : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        restaurant : null,
                        error : err,
                        msg: "erreur de connexion Ã  la base"
                    };
            callback(reponse);
        }
    });
}

exports.createVideo = function(formData, callback) {
	MongoClient.connect(url, function(err, db) {
	
	    if(!err) {
	 
			let toInsert = {
				name : formData.name,
				user : formData.user, 
				url : formData.url, 
				details : formData.details,  
			};
			
		    db.collection("videos")
		    .insertOne(toInsert, function(err, result) {
		    	let reponse;

		        if(!err){
		            reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Ajout rÃ©ussi " + result
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "ProblÃ¨me Ã  l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"ProblÃ¨me lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updateVideo = function(id, formData, callback) {
	MongoClient.connect(url, function(err, db) {
			
		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        let newvalues = {
	        	name : formData.name,
				user : formData.user, 
				url : formData.url, 
				details : formData.details, 
	        };


			db.collection("videos")
			.updateOne(myquery, newvalues, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification rÃ©ussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "ProblÃ¨me Ã  la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"ProblÃ¨me lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deleteVideo = function(id, callback) {
	MongoClient.connect(url, function(err, db) {
		
		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        
			db.collection("videos")
			.deleteOne(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression rÃ©ussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "ProblÃ¨me Ã  la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"ProblÃ¨me lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.countVideo = function(callback) {
	console.log("DANS COUNT")
	MongoClient.connect(url, function(err, db) {
		db.collection('videos')
		.count(function(err, res) {
			console.log("COUNT = " + res)
			callback(res);
		});
	});
};

exports.findVideoByName = function(nom,page, pagesize, callback) {
    MongoClient.connect(url, function(err, db) {
		
    	    console.log("pagesize = " + pagesize);
    	    console.log("page = " + page);
    console.log("FIND BY NAME nom=" + nom);

    	let myquery = {
    		"name": {
    			$regex: ".*" + nom + ".*", 
    			$options:"i"
    		}
    	}

        if(!err){
            db.collection('videos')
            .find(myquery)
            .skip(page*pagesize)
            .limit(pagesize)
            .toArray()
            .then(arr => callback(arr));
        }
        else{
            callback(-1);
        }
    });
};