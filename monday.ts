import fs from 'fs';
import path from 'path';
import moment from 'moment';

const jsonsInDir = fs.readdirSync('./cpl_json').filter(file => path.extname(file) === '.json');
const myConsole = new console.Console(fs.createWriteStream('./output-monday.txt'));
let jsonFilesInDir = jsonsInDir.map(x => x.replace(/\.[^/.]+$/, ""));
let nosJsonFilesInDir = jsonFilesInDir.map(x => parseInt(x))
let sortedJsonFilesInDir = [...nosJsonFilesInDir].sort((a, b) => a - b);
let target = 0;

sortedJsonFilesInDir.forEach((file: any) => {
  const fileData = fs.readFileSync(path.join('./cpl_json', file.toString() + '.json'));
  const json = JSON.parse(fileData.toString());
  const day = moment(json.info.dates[0]).day();
  if (day === 1) {
    if (json.info.outcome.by?.runs > 0) {
      let bat1 = 0;
      let wickets1 = 0;
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
      //console.log(bat1)
      myConsole.log(json.info.dates[0] + " - Monday defended" + " -" + bat1);
      const likelyTarget = Math.round(Math.pow((Math.sqrt(bat1) + 0.5), 2));
      if (bat1 > 144) {
        target = likelyTarget;
      }
      myConsole.log("Target for other days: " + target);

    } else {
      //console.log(json.info.dates[0] + " - Monday chased")
    }
  }
  if (day === 2) {
    if (target > 0) {
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
      if (bat1 >= target) {
        if (bat1 > bat2) {
          myConsole.log(json.info.dates[0] + " - Tuesday defended pass" + " -" + bat1);
          target = 0;
        } else {
          myConsole.log(json.info.dates[0] + " - Tuesday chased fail" + " -" + bat1);
        }
      }
    }
  }
  if (day === 3) {
    if (target > 0) {
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
      if (bat1 >= target) {
        if (bat1 > bat2) {
          myConsole.log(json.info.dates[0] + " - Wednesday defended pass" + " -" + bat1);

          target = 0;
        } else {
          myConsole.log(json.info.dates[0] + " - Wednesday chased fail" + " -" + bat1);
        }
      }
    }
  }
  if (day === 4) {
    if (target > 0) {
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
      if (bat1 >= target) {
        if (bat1 > bat2) {
          myConsole.log(json.info.dates[0] + " - Thursday defended pass" + " -" + bat1);
          target = 0;
        } else {
          myConsole.log(json.info.dates[0] + " - Thursday chased fail" + " -" + bat1);
        }
      }
      target = 0;
    }
  }
});
