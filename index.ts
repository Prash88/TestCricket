import fs from 'fs';
import path from 'path';
import moment from 'moment';

const jsonsInDir = fs.readdirSync('./ipl_json').filter(file => path.extname(file) === '.json');
const myConsole = new console.Console(fs.createWriteStream('./output-score.txt'));
let jsonFilesInDir = jsonsInDir.map(x => x.replace(/\.[^/.]+$/, ""));
let nosJsonFilesInDir = jsonFilesInDir.map(x => parseInt(x))
let sortedJsonFilesInDir = [...nosJsonFilesInDir].sort((a, b) => a - b);

sortedJsonFilesInDir.forEach((file: any) => {
  const fileData = fs.readFileSync(path.join('./ipl_json', file.toString() + '.json'));
  const json = JSON.parse(fileData.toString());
  let runInOvers0 = 0;
  let runInOvers1 = 0;
  let runInOvers2 = 0;
  let runInOvers3 = 0;
  let runInOvers4 = 0;
  let runInOvers5 = 0;
  let team1Runs = 0;
  let team2Runs = 0;
  let team1Wickets = 0;
  let team2Wickets = 0;

  json.innings[0] && json.innings[0].overs && json.innings[0].overs.length > 0 && json.innings[0].overs.forEach((e: any) => {
    if(e.over === 0) {
      e.deliveries.forEach((m: any) => {
        runInOvers0 = runInOvers0 + m.runs.total;
      });
    }
    if(e.over === 1) {
      e.deliveries.forEach((m: any) => {
        runInOvers1 = runInOvers1 + m.runs.total;
      });
    }
    if(e.over === 2) {
      e.deliveries.forEach((m: any) => {
        runInOvers2 = runInOvers2 + m.runs.total;
      });
    }
    if(e.over === 3) {
      e.deliveries.forEach((m: any) => {
        runInOvers3 = runInOvers3 + m.runs.total;
      });
    }
    if(e.over === 4) {
      e.deliveries.forEach((m: any) => {
        runInOvers4 = runInOvers4 + m.runs.total;
      });
    }
    if(e.over === 5) {
      e.deliveries.forEach((m: any) => {
        runInOvers5 = runInOvers5 + m.runs.total;
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
    e.deliveries.forEach((m: any) => {
      team2Runs = team2Runs + m.runs.total;
      if (m.wickets && m.wickets.length > 0) {
        team2Wickets = team2Wickets + 1;
      }
    });
  });

  if (json.innings[0] && json.innings[1]) {
    myConsole.log(json.info.dates[0]);
    myConsole.log(json.innings[0].team + " - powerplay runs - " + runInOvers0 + "," + runInOvers1 + "," + runInOvers2 + "," + runInOvers3 + "," + runInOvers4 + "," + runInOvers5);
    myConsole.log(json.innings[0].team + " - " + team1Runs + "/" + team1Wickets + " " + json.innings[1].team + " - " + team2Runs + "/" + team2Wickets);
  }

});