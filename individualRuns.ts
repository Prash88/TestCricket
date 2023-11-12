import fs from 'fs';
import path from 'path';

const jsonsInDir = fs.readdirSync('./odis_json').filter(file => path.extname(file) === '.json');
let gameNo = 1; 
const myConsole = new console.Console(fs.createWriteStream('./output-batfirst.txt'));
const myConsole1 = new console.Console(fs.createWriteStream('./output-chase.txt'));

jsonsInDir.forEach((file: any) => {
  //myConsole.log(file);
  const fileData = fs.readFileSync(path.join('./odis_json', file));
  const json = JSON.parse(fileData.toString());
  if (json.info.teams.length > 0 && json.info.match_type === 'ODI') {
    let dataIsGood = true;

    let batter0 = 0;
    let batter1 = 0;
    let batter2 = 0;
    let batter3 = 0;
    let batter4 = 0;
    let batter5 = 0;
    let batter6 = 0;
    let batter7 = 0;
  
    let batter0Satisfy = 0;
    let batter1Satisfy = 0;
    let batter2Satisfy = 0;
    let batter3Satisfy = 0;
    let batter4Satisfy = 0;
    let batter5Satisfy = 0;
    let batter6Satisfy = 0;
    let batter7Satisfy = 0;
  
    let batter0Boundaries: [number?] = [];
    let batter1Boundaries: [number?] = [];
    let batter2Boundaries: [number?] = [];
    let batter3Boundaries: [number?] = [];
    let batter4Boundaries: [number?] = [];
    let batter5Boundaries: [number?] = [];
    let batter6Boundaries: [number?] = [];
    let batter7Boundaries: [number?] = [];

    json.innings[0] && json.innings[0].overs && json.innings[0].overs.length > 0 && json.innings[0].overs.forEach((e: any) => {
      e.deliveries.forEach((m: any) => {
        if (json.info.players[json.info.teams[0]].slice(0,4)[0] === m.batter) {
          batter0 = batter0 + m.runs.batter;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter0Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter0Satisfy = batter0;
            }
          }
        }
        if (json.info.players[json.info.teams[0]].slice(0,4)[1] === m.batter) {
          batter1 = batter1 + m.runs.batter;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter1Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter1Satisfy = batter1;
            }
          }
        }
        if (json.info.players[json.info.teams[0]].slice(0,4)[2] === m.batter) {
          batter2 = batter2 + m.runs.batter;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter2Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter2Satisfy = batter2;
            }
          }
        }
        if (json.info.players[json.info.teams[0]].slice(0,4)[3] === m.batter) {
          batter3 = batter3 + m.runs.batter;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter3Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter3Satisfy = batter3;
            }
          }
        }
        if (json.info.players[json.info.teams[1]].slice(0,4)[0] === m.batter) {
          batter4 = batter4 + m.runs.batter;
          dataIsGood = false;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter4Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter4Satisfy = batter4;
            }
          }
        }
        if (json.info.players[json.info.teams[1]].slice(0,4)[1] === m.batter) {
          batter5 = batter5 + m.runs.batter;
          dataIsGood = false;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter5Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter5Satisfy = batter5;
            }
          }
        }
        if (json.info.players[json.info.teams[1]].slice(0,4)[2] === m.batter) {
          batter6 = batter6 + m.runs.batter;
          dataIsGood = false;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter6Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter6Satisfy = batter6;
            }
          }
        }
        if (json.info.players[json.info.teams[1]].slice(0,4)[3] === m.batter) {
          batter7 = batter7 + m.runs.batter;
          dataIsGood = false;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter7Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter7Satisfy = batter7;
            }
          }
        }
      });
    });
    json.innings[1] && json.innings[1].overs && json.innings[1].overs.length > 0 && json.innings[1].overs.forEach((e: any)=> {
      e.deliveries.forEach((m: any) => {
        if (json.info.players[json.info.teams[0]].slice(0,4)[0] === m.batter) {
          batter0 = batter0 + m.runs.batter;
          dataIsGood = false;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter0Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter0Satisfy = batter0;
            }
          }
        }
        if (json.info.players[json.info.teams[0]].slice(0,4)[1] === m.batter) {
          batter1 = batter1 + m.runs.batter;
          dataIsGood = false;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter1Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter1Satisfy = batter1;
            }
          }
        }
        if (json.info.players[json.info.teams[0]].slice(0,4)[2] === m.batter) {
          batter2 = batter2 + m.runs.batter;
          dataIsGood = false;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter2Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter2Satisfy = batter2;
            }
          }
        }
        if (json.info.players[json.info.teams[0]].slice(0,4)[3] === m.batter) {
          batter3 = batter3 + m.runs.batter;
          dataIsGood = false;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter3Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter3Satisfy = batter3;
            }
          }
        }
        if (json.info.players[json.info.teams[1]].slice(0,4)[0] === m.batter) {
          batter4 = batter4 + m.runs.batter;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter4Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter4Satisfy = batter4;
            }
          }
        }
        if (json.info.players[json.info.teams[1]].slice(0,4)[1] === m.batter) {
          batter5 = batter5 + m.runs.batter;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter5Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter5Satisfy = batter5;
            }
          }
        }
        if (json.info.players[json.info.teams[1]].slice(0,4)[2] === m.batter) {
          batter6 = batter6 + m.runs.batter;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter6Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter6Satisfy = batter6;
            }
          }
        }
        if (json.info.players[json.info.teams[1]].slice(0,4)[3] === m.batter) {
          batter7 = batter7 + m.runs.batter;
          if (m.runs.batter === 4 || m.runs.batter === 6) {
            const arrLen = batter7Boundaries.push(m.runs.batter);
            if (arrLen === 3) {
              batter7Satisfy = batter7;
            }
          }
        }
      });
    });
    myConsole.log(json.info.dates[0] + ',' + json.info.teams[0]+ ',' + json.info.teams[1]);
    myConsole1.log(json.info.dates[0] + ',' + json.info.teams[0]+ ',' + json.info.teams[1]);
    if(batter0Satisfy > 0) {
      if (dataIsGood) {
        myConsole.log(json.info.players[json.info.teams[0]][0] + ',' + batter0Satisfy + ',' + batter0 + ',' + batter0Boundaries)
      } else {
        myConsole1.log(json.info.players[json.info.teams[0]][0] + ',' + batter0Satisfy + ',' + batter0 + ',' + batter0Boundaries)
      }
    }
    if(batter1Satisfy > 0) {
      if (dataIsGood) {
        myConsole.log(json.info.players[json.info.teams[0]][1] + ',' + batter1Satisfy + ',' + batter1 + ',' + batter1Boundaries)
      } else {
        myConsole1.log(json.info.players[json.info.teams[0]][1] + ',' + batter1Satisfy + ',' + batter1 + ',' + batter1Boundaries)
      }
    }
    if(batter2Satisfy > 0) {
      if (dataIsGood) {
        myConsole.log(json.info.players[json.info.teams[0]][2] + ',' + batter2Satisfy + ',' + batter2 + ',' + batter2Boundaries)
      } else {
        myConsole1.log(json.info.players[json.info.teams[0]][2] + ',' + batter2Satisfy + ',' + batter2 + ',' + batter2Boundaries)
      }
    }
    if(batter3Satisfy > 0) {
      if (dataIsGood) {
        myConsole.log(json.info.players[json.info.teams[0]][3] + ',' + batter3Satisfy + ',' + batter3 + ',' + batter3Boundaries)
      } else {
        myConsole1.log(json.info.players[json.info.teams[0]][3] + ',' + batter3Satisfy + ',' + batter3 + ',' + batter3Boundaries)
      }
    }

    if(batter4Satisfy > 0) {
      if (dataIsGood) {
        myConsole1.log(json.info.players[json.info.teams[1]][0] + ',' + batter4Satisfy + ',' + batter4 + ',' + batter4Boundaries)
      } else {
        myConsole.log(json.info.players[json.info.teams[1]][0] + ',' + batter4Satisfy + ',' + batter4 + ',' + batter4Boundaries)
      }
    }
    if(batter5Satisfy > 0) {
      if (dataIsGood) {
        myConsole1.log(json.info.players[json.info.teams[1]][1] + ',' + batter5Satisfy + ',' + batter5 + ',' + batter5Boundaries)
      } else {
        myConsole.log(json.info.players[json.info.teams[1]][1] + ',' + batter5Satisfy + ',' + batter5 + ',' + batter5Boundaries)
      }
    }
    if(batter6Satisfy > 0) {
      if (dataIsGood) {
        myConsole1.log(json.info.players[json.info.teams[1]][2] + ',' + batter6Satisfy + ',' + batter6 + ',' + batter6Boundaries)
      } else {
        myConsole.log(json.info.players[json.info.teams[1]][2] + ',' + batter6Satisfy + ',' + batter6 + ',' + batter6Boundaries)
      }
    }
    if(batter7Satisfy > 0) {
      if (dataIsGood) {
        myConsole1.log(json.info.players[json.info.teams[1]][3] + ',' + batter7Satisfy + ',' + batter7 + ',' + batter7Boundaries)
      } else {
        myConsole.log(json.info.players[json.info.teams[1]][3] + ',' + batter7Satisfy + ',' + batter7 + ',' + batter7Boundaries)
      }
    }

    //myConsole.log(json.info.players[json.info.teams[0]][0] + ',' + batter0 + ',' + json.info.players[json.info.teams[0]][1] + ',' + batter1 + ',' + json.info.players[json.info.teams[0]][2] + ',' + batter2 + ','+ json.info.players[json.info.teams[0]][3] + ',' + batter3);
    //myConsole.log(json.info.players[json.info.teams[1]][0] + ',' + batter4 + ',' + json.info.players[json.info.teams[1]][1] + ',' + batter5 + ',' + json.info.players[json.info.teams[1]][2] + ',' + batter6 + ','+ json.info.players[json.info.teams[1]][3] + ',' + batter7);
    gameNo = gameNo + 1;
  } 
});
