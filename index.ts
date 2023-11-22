import fs from 'fs';
import path from 'path';

const jsonsInDir = fs.readdirSync('./ntb_json').filter(file => path.extname(file) === '.json');
let gameNo = 1; 
const myConsole = new console.Console(fs.createWriteStream('./output-allteams.csv'));
let pass = 0;
let fail = 0;
let jsonFilesInDir = jsonsInDir.map(x => x.replace(/\.[^/.]+$/, ""));
let nosJsonFilesInDir = jsonFilesInDir.map(x => parseInt(x))
let sortedJsonFilesInDir = [...nosJsonFilesInDir].sort((a, b) => a - b);
let teamsList: [string] = ["Royal Challengers Bangalore"];

sortedJsonFilesInDir.forEach((file: any) => {
  const fileData = fs.readFileSync(path.join('./ntb_json', file.toString() + '.json'));
  const json = JSON.parse(fileData.toString());
  teamsList.push(json.info.teams[0]);
  teamsList.push(json.info.teams[1]);
});

let unique = [...new Set(teamsList)];

unique && unique.length > 0 && unique.forEach(m => {
  myConsole.log(m);
  myConsole.log("--------------------------");
  sortedJsonFilesInDir.forEach((file: any) => {
    const fileData = fs.readFileSync(path.join('./ntb_json', file.toString() + '.json'));
    const json = JSON.parse(fileData.toString());
    if (json.info.teams.includes(m)) {

      myConsole.log(json.info.dates[0] + ',' + json.info.teams[0] + ' vs ' + json.info.teams[1]);

      let bat1 = 0;
      let wickets1 = 0;
      let bat2 = 0;
      let wickets2 = 0;

      json.innings[0] && json.innings[0].overs && json.innings[0].overs.length > 0 && json.innings[0].overs.forEach(
        (o: any) => {
          o.deliveries.forEach(
            (r: any) => {
              bat1 = bat1 + r.runs.total;
              if (r.wickets && r.wickets.length > 0) {
                wickets1 = wickets1 + 1;
              }
            }
          );
        }
      );

      json.innings[1] && json.innings[1].overs && json.innings[1].overs.length > 0 && json.innings[1].overs.forEach(
        (o: any) => {
          o.deliveries.forEach(
            (r: any) => {
              bat2 = bat2 + r.runs.total;
              if (r.wickets && r.wickets.length > 0) {
                wickets2 = wickets2 + 1;
              }
            }
          );
        }
      );
      if (json.innings[0] && json.innings[0].team === m) {
        myConsole.log(m + ":bat first");
        let overs = 0;

        let runOvers1 = 0;
        let runOvers2 = 0;
        let runOvers3 = 0;
        let runOvers4 = 0;
        let runOvers5 = 0;
        let runOvers6 = 0;

        json.innings[0] && json.innings[0].overs && json.innings[0].overs.length > 0 && json.innings[0].overs.forEach(
          (o: any) => {
            overs = overs + 1;
            o.deliveries.forEach(
              (r: any) => {
                if (overs === 1) {
                  runOvers1 = runOvers1 + r.runs.total;
                }
                if (overs === 2) {
                  runOvers2 = runOvers2 + r.runs.total;
                } 
                if (overs === 3) {
                  runOvers3 = runOvers3 + r.runs.total;
                } 
                if (overs === 4) {
                  runOvers4 = runOvers4 + r.runs.total;
                } 
                if (overs === 5) {
                  runOvers5 = runOvers5 + r.runs.total;
                } 
                if (overs === 6) {
                  runOvers6 = runOvers6 + r.runs.total;
                }  
              }
            );
          }
        );
        //myConsole.log(json.info.dates[0] + ',' + json.info.teams[0] + ' vs ' + json.info.teams[1] + ',' + m + ":bat first" + ',' + bat1 + '/' + wickets1 + ' vs ' + bat2 + '/' + wickets2 + ',' + runOvers1 + ',' + runOvers2 + ',' + runOvers3 + ',' + runOvers4 + ',' + runOvers5 + ',' + runOvers6);

        myConsole.log(bat1 + '/' + wickets1 + ' vs ' + bat2 + '/' + wickets2); 
        myConsole.log(runOvers1 + ',' + runOvers2 + ',' + runOvers3 + ',' + runOvers4 + ',' + runOvers5 + ',' + runOvers6);
      } else {
        myConsole.log(m + ":bowl first");
        myConsole.log(bat1 + '/' + wickets1 + ' vs ' + bat2 + '/' + wickets2);
        //myConsole.log(json.info.dates[0] + ',' + json.info.teams[0] + ' vs ' + json.info.teams[1] + ',' + m + ":bowl first" + ',' + bat1 + '/' + wickets1 + ' vs ' + bat2 + '/' + wickets2 );
 
      }
    }
  });
});
