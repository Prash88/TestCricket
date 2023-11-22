import fs from 'fs';
import path from 'path';

const jsonsInDir = fs.readdirSync('./ipl_json').filter(file => path.extname(file) === '.json');
let gameNo = 1; 
const myConsole = new console.Console(fs.createWriteStream('./output-5overs.txt'));
let pass = 0;
let fail = 0;

jsonsInDir.forEach((file: any) => {
  const fileData = fs.readFileSync(path.join('./ipl_json', file));
  const json = JSON.parse(fileData.toString());
  if (json.info.teams.length > 0 && json.info.match_type === 'ODM') {
    let runInOvers0 = 0;
    let runInOvers1 = 0;
    let runInOvers2 = 0;
    let runInOvers3 = 0;
    let runInOvers4 = 0;
    let totalRuns = 0;

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
      e.deliveries.forEach((m: any) => {
        totalRuns = totalRuns + m.runs.total;
      });
    });
    if ((runInOvers0 === 12 || runInOvers2 === 14 || runInOvers3 === 13 || runInOvers3 === 15 || runInOvers4 === 14) && totalRuns >= 267) {
      console.log(json.info.dates[0] + ',' + json.info.teams[0]+ ',' + json.info.teams[1] + ',' +  + ','+ JSON.stringify(json.info.outcome));
      console.log(json.innings[0].team + ',' + runInOvers0 + ',' + runInOvers1 + ',' + runInOvers2 + ',' + runInOvers3 + ',' + runInOvers4 + ',' + totalRuns);
      if (json.info.outcome.winner === json.innings[0].team) {
        pass = pass + 1;
      }
      if (json.info.outcome.winner !== json.innings[0].team) {
        fail = fail + 1;
      }
    }
    gameNo = gameNo + 1;
  }
  console.log("Pass: " + pass)
  console.log("Fail: " + fail)
});
