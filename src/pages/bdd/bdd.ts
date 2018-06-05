import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';

const DATABASE_FILE_NAME: string = 'data.db';

@Injectable()
export class DbProvider {

  public db: SQLiteObject;

  constructor(public platform: Platform, public http: HttpClient, public sqlite: SQLite) {
  }
  //Créer la DATABASE
  public execute(fn): any {
    console.log('CREATE DATABASE FILE');
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Database created');
        this.db = db;
        return fn();
      })
      .catch(e => console.log(e));
  }

  //Créer 'oeuvres' dans DATABASE
  public createTable(): any {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `oeuvres` ( `id` INTEGER PRIMARY KEY, `nom` TEXT, `prenom` TEXT, `qr_code` INTEGER, `statut` TEXT )', {})
      .then(() => {
        console.log("Table 'oeuvres' created");
        this.db.executeSql('SELECT * FROM `oeuvres`', {})
          .then((table) => {
            if (table.rows.length >= 1) {
              console.log('Table already filled')
            } else {
              this.insertIntoTable();
            }
          })
      })
      .catch(e => console.log(e));
  }

  //Drop Table of the DATABASE
  public dropTable(): any {
    this.db.executeSql('DROP TABLE `oeuvres`', {})
      .then((db: SQLiteObject) => {

        console.log('Table "oeuvres" Droped');

      })
  }

  //Insère valeurs dans 'oeuvres'
  private insertIntoTable(): void {
    this.db.executeSql("INSERT INTO `oeuvres` VALUES (1,'ALVAREZ','Jean-Pierre',9213750369,'radio-button-off')," +
      "(2,'ARAI','Poeragni',6510403686,'radio-button-off')," +
      "(3,'CHANSIN','Jerôme',7216899933,'radio-button-off')," +
      "(4,'CHEUNG-SEN ','Jonas',1629568455,'radio-button-off')," +
      "(5,'CUNNY','Heimana',9266553664,'radio-button-off')," +
      "(6,'EBB','Nicolas',1168085824,'radio-button-off')," +
      "(7,'LEHARTEL','Alexandre',2791010818,'radio-button-off')," +
      "(8,'LENOIR','Tetuaoro',4173047359,'radio-button-off')," +
      "(9,'LONGINE','Manaarii ',9782420312,'radio-button-off')," +
      "(10,'LY','Joane ',6872232276,'radio-button-off')," +
      "(11,'MARO','Teremu ',1234567890,'radio-button-off')," +
      "(12,'MONACO','Vaitare',4653519064,'radio-button-off')," +
      "(13,'PAEAHI','Ariipaea',3658034121,'radio-button-off')," +
      "(14,'PAMBRUN','Aito ',5175547403,'radio-button-off')," +
      "(15,'PAMBRUN','Hiomai',9520532017,'radio-button-off')," +
      "(16,'PEREZ','Rahiti',1228597258,'radio-button-off')," +
      "(17,'PERRY','Matihamu ',5480211371,'radio-button-off')," +
      "(18,'ROUSSEL','Christian ',2462643924,'radio-button-off')," +
      "(19,'TEHUPE','Tinirau ',5055364030,'radio-button-off')," +
      "(20,'TEMATAHOTOA','Tinirau ',6232447902,'radio-button-off')," +
      "(21,'TOOFA','Teparii ',4235066246,'radio-button-off');", {})
      .then(() => console.log('Insert Sucess'))
      .catch(e => console.log(e, 'Insert Failed'));

  }



}