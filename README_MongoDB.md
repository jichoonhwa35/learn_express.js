# Databases

## Intro to Databases
* SQL (relational) vs NoSQL (non-relational)

======================
A REALTIONAL DATABASE
======================
USER TABEL
id | name | age| city|
-----------------------
1  | Tim  | 57 |  NYC
2  | Ira  | 27 |  Boston
3  | Sue  | 37 |  Nashua

COMMENT TABLE
id |  text
----------
1  | "lol"
2  | "I love puppies!"

USER /COMMENTS JOIN TABLE
userId | commentID
1      |   2
2      |   1
3      |   null

=========================
A NON-RELATIONAL DATABASE
=========================
{
    name: " ",
    age: ,
    city: ,
    comments[
        {text: "" },
        {text: "" },
    ]
}

## mongoDB installation

https://community.c9.io/t/setting-up-mongodb/1717

## mongoDB command lines
* ./mongod: run the process/server
* mongo: run the shell/console
* help
* show dbs
* use (dbname)
* show collections
* db.dbcollectionname.find({})  
* db.dbcollectionname.update({,}) /$set??? update sets
* db.dbcollectionname.remove({})
* db.dbcollectionname.drop() drop all things/big change

* ./mongod --repair : repair from unexpected shutdown
 



## RESTFUL ROUTES

name      url         verb      desc
====================================
INDEX    /dogs        GET       display a list of all dog
NEW      /dogs/new    GET       displays form to make a new dog
CREATE   /dogs        POST      add new dog to DB
SHOW     /dogs/:id    GET       shows info about one dog 


## uninstall & install MongoDB
https://www.youtube.com/watch?v=b089GmAvUyQ&feature=youtu.be&t=6m8s

sudo apt-mark showhold
sudo apt install libcurl3

killall mongod
sudo service mongod stop
sudo apt-get purge mongodb-org*
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
sudo apt-get install -y mongodb-org

cd into ~/
rm -rf mongod : remove old mongod file
echo "mongod --dbpath=data --nojournal" > mongod : make a new inactive mongod file 
chmod a+x mongod : active mongod file
mkdir data