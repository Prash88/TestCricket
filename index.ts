import fs from 'fs';
import path from 'path';
import moment from 'moment';

const jsonsInDir = fs.readdirSync('./ipl_json').filter(file => path.extname(file) === '.json');
const myConsole = new console.Console(fs.createWriteStream('./output-pp-score.txt'));
let jsonFilesInDir = jsonsInDir.map(x => x.replace(/\.[^/.]+$/, ""));
let nosJsonFilesInDir = jsonFilesInDir.map(x => parseInt(x))
let sortedJsonFilesInDir = [...nosJsonFilesInDir].sort((a, b) => a - b);

sortedJsonFilesInDir.forEach((file: any) => {
  const fileData = fs.readFileSync(path.join('./ipl_json', file.toString() + '.json'));
  const json = JSON.parse(fileData.toString());
  let team1RunsPP = 0;
  let team2RunsPP = 0;
  let team1WicketsPP = 0;
  let team2WicketsPP = 0;
  let team1Runs = 0;
  let team2Runs = 0;
  let team1Wickets = 0;
  let team2Wickets = 0;

  json.innings[0] && json.innings[0].overs && json.innings[0].overs.length > 0 && json.innings[0].overs.forEach((e: any) => {
    if (e.over < 6) {
      e.deliveries.forEach((m: any) => {
        team1RunsPP = team1RunsPP + m.runs.total;
        if (m.wickets && m.wickets.length > 0) {
          team1WicketsPP = team1WicketsPP + 1;
        }
      });
    }
    e.deliveries.forEach((m: any) => {
      team1Runs = team1Runs + m.runs.total;
      if (m.wickets && m.wickets.length > 0) {
        team1Wickets = team1Wickets + 1;
      }
    });
  });

  json.innings[1] && json.innings[1].overs && json.innings[1].overs.length > 0 && json.innings[1].overs.forEach((e: any) => {
    if (e.over < 6) {
      e.deliveries.forEach((m: any) => {
        team2RunsPP = team2RunsPP + m.runs.total;
        if (m.wickets && m.wickets.length > 0) {
          team2Wickets = team2Wickets + 1;
        }
      });
    }
    e.deliveries.forEach((m: any) => {
      team2Runs = team2Runs + m.runs.total;
      if (m.wickets && m.wickets.length > 0) {
        team2Wickets = team2Wickets + 1;
      }
    });
  });

  if (json.innings[0] && json.innings[1]) {
    myConsole.log(json.info.dates[0]);
    myConsole.log(json.innings[0].team + " Powerplay - " + team1RunsPP + "/" + team1WicketsPP + " " + json.innings[1].team + " Powerplay - " + team2RunsPP + "/" + team2WicketsPP);
    myConsole.log(json.innings[0].team + " - " + team1Runs + "/" + team1Wickets + " " + json.innings[1].team + " - " + team2Runs + "/" + team2Wickets);
  }

});