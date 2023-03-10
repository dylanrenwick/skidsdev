var defaultBlob = {
    score: 0,
    cheatPower: 1000,
    stats: {
        clickCount: 0,
        clickValue: 0,
        scoreEarned: 0,
        cheatPowerGained: 0,
        autoclickerEarned: 0,
        ticksPlayed: 0,
    },
    buildings: [
        0, //scoreWell
        0, //scorePrinter
        0, //scoreMachine
    ],
    factionCoins: [
        0, 0, 0,
        0, 0, 0
    ],
    boughtUpgrades: [],
    activeEffects: []
};
var blob = defaultBlob;

var glob = {
    created: false,
    updateList: [],
    upgrades: [],
    cheats: [],
    effects: [],
    tps: 20,
    spc: 1,
    factionCoinChance: 10,
    autoSaveCounter: 0,
    autoSaveInterval: 5,
    globalBuildingModifier: 1,
    clickModifier: 1,
    clickBonus: 0,
    productionAsClick: 0,
    maxCheatPower: 1000,
    cheatPowerps: 1,
    autoclickers: 0,
    acFactionCoinChance: 2,
    tick: {},
    buildings: {
        scoreWell: {
            id: 0,
            cost: 10,
            costMult: 1.15,
            score: 2,
            modifier: 1,
            name: "Score Well"
        },
        scorePrinter: {
            id: 1,
            cost: 125,
            costMult: 1.15,
            score: 6,
            modifier: 1,
            name: "Score Printer"
        },
        scoreMachine: {
            id: 2,
            cost: 600,
            costMult: 1.15,
            score: 20,
            modifier: 1,
            name: "Score Machine"
        },
        leaderboard: {
            id: 10,
            cost: 2e8,
            costMult: 1.15,
            score: 250000,
            modifier: 1,
            name: "Leaderboard"
        },
        scoreMine: {
            id: 3,
            cost: 1800,
            costMult: 1.15,
            score: 65,
            modifier: 1,
            name: "Score Mine"
        },
        scoreChapel: {
            id: 3,
            cost: 1800,
            costMult: 1.15,
            score: 65,
            modifier: 1,
            name: "Score Chapel"
        },
        scoreDrill: {
            id: 4,
            cost: 5600,
            costMult: 1.15,
            score: 200,
            modifier: 1,
            name: "Score Drill"
        },
        scoreChurch: {
            id: 4,
            cost: 5600,
            costMult: 1.15,
            score: 200,
            modifier: 1,
            name: "Score Church"
        },
        scoreQuarry: {
            id: 5,
            cost: 38000,
            costMult: 1.15,
            score: 650,
            modifier: 1,
            name: "Score Quarry"
        },
        scoreAbbey: {
            id: 5,
            cost: 38000,
            costMult: 1.15,
            score: 650,
            modifier: 1,
            name: "Score Abbey"
        },
        scoreRig: {
            id: 6,
            cost: 442000,
            costMult: 1.15,
            score: 2000,
            modifier: 1,
            name: "Score Rig"
        },
        scoreMonastery: {
            id: 6,
            cost: 442000,
            costMult: 1.15,
            score: 2000,
            modifier: 1,
            name: "Score Monastery"
        },
        scoreFoundry: {
            id: 7,
            cost: 7.3e6,
            costMult: 1.15,
            score: 8500,
            modifier: 1,
            name: "Score Foundry"
        },
        scoreCathedral: {
            id: 7,
            cost: 7.3e6,
            costMult: 1.15,
            score: 8500,
            modifier: 1,
            name: "Score Cathedral"
        },
        scoreFactory: {
            id: 8,
            cost: 1.45e8,
            costMult: 1.15,
            score: 1e5,
            modifier: 1,
            name: "Score Factory"
        },
        scoreParthenon: {
            id: 8,
            cost: 1.45e8,
            costMult: 1.15,
            score: 1e5,
            modifier: 1,
            name: "Score Parthenon"
        },
        scoreMegacorp: {
            id: 9,
            cost: 3.2e9,
            costMult: 1.15,
            score: 1.2e6,
            modifier: 1,
            name: "Score Megacorp"
        },
        scoreVatican: {
            id: 9,
            cost: 3.2e9,
            costMult: 1.15,
            score: 1.2e6,
            modifier: 1,
            name: "Score Vatican"
        }
    }
};

var factionBuildings = [
    [
        glob.buildings.scoreChapel,
        glob.buildings.scoreChurch,
        glob.buildings.scoreAbbey,
        glob.buildings.scoreMonastery,
        glob.buildings.scoreCathedral,
        glob.buildings.scoreParthenon,
        glob.buildings.scoreVatican
    ],
    [
        glob.buildings.scoreMine,
        glob.buildings.scoreDrill,
        glob.buildings.scoreQuarry,
        glob.buildings.scoreRig,
        glob.buildings.scoreFoundry,
        glob.buildings.scoreFactory,
        glob.buildings.scoreMegacorp
    ],
    []
];

var factionUpgrades = [
    ["ScoreReligion", 78],
    ["NaturalExploitation", 79]
];
var subFactionUpgrades = [
    ["TraditionalistTeachings", 393],
    ["OrthodoxTeachings", 394],
    ["CultistTeachings", 395],
    ["InvestorContract", 396],
    ["ExecutiveContract", 397],
    ["StartupContract", 398],
]

function update() {
    _update.bind(blob)();
}
function _update () {
    let start = Date.now();
    if (this.created !== false) {
        let toRemove = [];
        for (let e of blob.activeEffects) {
            let element = document.getElementById(e.element);
            if (!element) continue;
            let bars = element.getElementsByClassName("barFill");
            if (!bars) continue;
            let bar = bars[0];

            e.duration -= 1 / glob.tps;
            if (e.duration <= 0) {
                glob.effects[e.id].offEffect();
                bar.parentElement.parentElement.remove();
                toRemove.push(e);
            } else {
                let amt = e.duration / glob.effects[e.id].duration * 200;
                bar.style.width = amt + "px";
            }
        }
        toRemove.forEach(x => blob.activeEffects.splice(blob.activeEffects.indexOf(x), 1));

        glob.cheatPowerBar.style.width = (blob.cheatPower / blob.maxCheatPower * 300) + "px";
        glob.cheatPowerText.innerText = `Cheat Power: ${beautifyNumber(Math.floor(blob.cheatPower))}/${beautifyNumber(Math.floor(glob.maxCheatPower))} : ${beautifyNumber(glob.cheatPowerps, 3).split("").reverse().join("").substring(1).split("").reverse().join("")}/s`;

        glob.tick.clickBonus = 0;
        glob.tick.clickModifier = 1;
        glob.tick.cheatPowerBonus = 0;
        glob.tick.globalProductionModifier = 1;
        glob.tick.autoclickerBonus = 0;

        for (let u of glob.updateList) u();
        for (let c of glob.upgrades) {
            if (blob.boughtUpgrades.includes(c.id)) {
                c.pred();
                glob.upgrades.splice(glob.upgrades.indexOf(c), 1);
            } else if (c.cond() === true) {
                glob.upgradeGrid.appendChild(createUpgrade(c));
                glob.upgrades.splice(glob.upgrades.indexOf(c), 1);
            }
        }
        for (let c of glob.cheats) {
            if (c.cond() === true) {
                glob.cheatList.appendChild(createCheat(c));
                glob.cheats.splice(glob.cheats.indexOf(c), 1);
            }
        }

        if (blob.cheatPower < glob.maxCheatPower) {
            let diff = glob.maxCheatPower - blob.cheatPower;
            let cppt = (glob.cheatPowerps + glob.tick.cheatPowerBonus) / glob.tps;
            let amount = (diff > cppt ? cppt : diff)
            blob.cheatPower += amount;
            blob.stats.cheatPowerGained += amount;
        }
        if (blob.cheatPower > glob.maxCheatPower) blob.cheatPower = glob.maxCheatPower;

        let sps = 0;
        for (let b in glob.buildings) {
            if (!glob.buildings.hasOwnProperty(b)) continue;
            let build = glob.buildings[b];
            if (this.buildings[build.id] === undefined) continue;
            let count = this.buildings[build.id];
            if (build.id === 10) count *= blob.unlockedTrophies.length;
            let bSps = build.score * count * build.modifier * glob.globalBuildingModifier * glob.tick.globalProductionModifier
            let bSpt = bSps / glob.tps;
            this.score += bSpt;
            this.stats.scoreEarned += bSpt
            sps += bSps;
        }
        glob.sps = sps;

        let power = glob.spc + (glob.productionAsClick * glob.sps);
        power += glob.tick.clickBonus;
        power *= glob.clickModifier;
        power *= glob.tick.clickModifier;

        let acCount = glob.autoclickers + glob.tick.autoclickerBonus;

        let autoclickerValue = (acCount * power / 20) / glob.tps;
        blob.score += autoclickerValue;
        blob.stats.scoreEarned += autoclickerValue;
        blob.stats.autoclickerEarned += autoclickerValue;
        glob.sps += acCount * power / 20;

        let displayScore = beautifyNumber(Math.floor(this.score));
        glob.scoreText.innerText = `Score: ${displayScore}`;
        glob.spsText.innerText = `Score/s: ${beautifyNumber(glob.sps)}`;
        glob.acText.innerText = `Autoclickers: ${beautifyNumber(acCount)}`;
    }
    blob.stats.ticksPlayed += 1;
    if (blob.stats.ticksPlayed % glob.tps) onSecond();
    glob.autoSaveCounter++;
    if (glob.autoSaveCounter / glob.tps >= glob.autoSaveInterval) {
        save();
        glob.autoSaveCounter = 0;
    }

    let time = 1000 / glob.tps - (Date.now() - start);
    if (time > 0) glob.updateLoop = setTimeout(update, time);
    else update();
}
function onSecond() {
    let acCount = glob.autoclickers + glob.tick.autoclickerBonus;
    for (let i = 0; i < acCount; i++) {
        let chanceToken = Math.random() * 100;
        let count = (glob.acFactionCoinChance / 100) + (chanceToken <= glob.acFactionCoinChance % 100 ? 1 : 0);
        if (count > 0) {
            let faction = randInt(0, 5);
            blob.factionCoins[faction] += count;
        }
    }
}

function init() {
    glob.screen = document.getElementById("gameScreen");
    if (glob.screen === undefined) {
        throw new Error("Could not get game screen");
        return;
    }

    load();
    createGame();
    
    let toRemove = [];
    for (let c of glob.upgrades) {
        if (blob.boughtUpgrades.includes(c.id)) {
            c.pred();
            glob.upgrades.splice(glob.upgrades.indexOf(c), 1);
        } else if (c.cond() === true) {
            glob.upgradeGrid.appendChild(createUpgrade(c));
            toRemove.push(c);
        }
    }
    toRemove.forEach(x => glob.upgrades.splice(glob.upgrades.indexOf(x), 1));
    toRemove = []
    for (let c of glob.cheats) {
        if (c.cond() === true) {
            glob.cheatList.appendChild(createCheat(c));
            toRemove.push(c);
        }
    }
    toRemove.forEach(x => glob.cheats.splice(glob.cheats.indexOf(x), 1));

    setTimeout(() => {
        for (let e of blob.activeEffects) {
            let effect = glob.effects[e.id];
            effect.onEffect();
            createEffectBar(e.id);
        }
    }, blob.tps / 2);
}

window.addEventListener("load", init);

function save() {
    let storage = window.localStorage;
    let data = btoa(JSON.stringify(blob));
    storage.setItem("clickScoreSave", data);
    console.log("Saved!");
}
function load() {
    let storage = window.localStorage;
    let data = storage.getItem("clickScoreSave");
    if (data !== null) {
        try {
            newBlob = JSON.parse(atob(data));
            newBlob = recursiveConvert(newBlob);
            for (let i in newBlob.boughtUpgrades) {
                newBlob.boughtUpgrades[i] = Number(newBlob.boughtUpgrades[i]);
            }
            newBlob = addMissingFields(newBlob, blob);
            blob = newBlob;
            console.log(blob);
            console.log("Loaded");
        } catch (e) {
            console.error(e);
        }
    }
}
function recursiveConvert(obj) {
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        if (typeof(obj[key]) === "object") obj[key] = recursiveConvert(obj[key]);
        else if (typeof(obj[key]) === "number" && !obj[key].toString().includes('.')) obj[key] = obj[key];
        else if (typeof(obj[key]) === "string" && /^\d+n$/.test(obj[key])) obj[key] = obj[key].substring(obj[key].length - 1, -1);
    }
    return obj;
}
function addMissingFields(target, source) {
    for (let key in source) {
        if (!source.hasOwnProperty(key)) continue;
        if (!target.hasOwnProperty(key) || target[key] === undefined || target[key] === null) target[key] = source[key];
        else if (typeof(source[key]) === "number" && typeof(target[key]) === "bigint") target[key] = number(target[key]);
        else if (typeof(source[key]) === "number" && typeof(target[key]) === "string") target[key] = parseInt(target[key]);
        else if (typeof(source[key]) === "object" && typeof(target[key]) === "object") target[key] = addMissingFields(target[key], source[key]);
        else if (typeof(source[key]) !== typeof(target[key])) target[key] = source[key];
    }
    return target;
}
function wipeSave() {
    let storage = window.localStorage;
    storage.removeItem("clickScoreSave");
    blob = defaultBlob;

    window.location.reload();
}

function createGame() {
    let bigButton = document.createElement("span");
    bigButton.id = "bigButton";
    bigButton.innerText = "Click";
    bigButton.onclick = onBigButtonClick;
    bigButton.classList.add("button");
    glob.bigButton = bigButton;

    let statsBar = document.createElement("span");
    statsBar.id = "statsBar";
    statsBar.setAttribute("style",
    `width:100%;
    height:40px;
    position:absolute;
    bottom:0;
    left:0;
    background:#444;
    border-top:2px solid #222;
    color:#eee;`);
    glob.statsBar = statsBar;

    let scoreText = document.createElement("span");
    scoreText.id = "scoreText";
    scoreText.innerText = "Score: 0";
    scoreText.setAttribute("style",
    `user-select:none;
    position:absolute;
    left:10px;
    bottom:7px;
    font-size:22px;`);
    glob.scoreText = scoreText;

    statsBar.appendChild(scoreText);

    let spsText = document.createElement("span");
    spsText.id = "spsText";
    spsText.innerText = "Score/s: 0";
    spsText.setAttribute("style",
    `user-select:none;
    position:absolute;
    left:230px;
    bottom:7px;
    font-size:22px;`);
    glob.spsText = spsText;

    statsBar.appendChild(spsText);

    let acText = document.createElement("span");
    acText.id = "acText";
    acText.innerText = "Autoclickers: 0";
    acText.setAttribute("style",
    `user-select:none;
    position:absolute;
    right:10px;
    bottom:7px;
    font-size:22px;`);
    glob.acText = acText;
    
    statsBar.appendChild(acText);

    let buildingPanel = document.createElement("span");
    buildingPanel.id = "buildingPanel";
    buildingPanel.setAttribute("style",
    `width:250px;
    height:625px;
    position:absolute;
    box-sizing:border-box;
    right:0;
    user-select:none;
    display:block;
    border:2px solid #888;
    border-radius:10px;
    background:#aaa;
    padding:8px;`);
    glob.buildingPanel = buildingPanel;

    buildingPanel.appendChild(createBuilding(glob.buildings.scoreWell, "Score Well"));
    buildingPanel.appendChild(createBuilding(glob.buildings.scorePrinter, "Score Printer"));
    buildingPanel.appendChild(createBuilding(glob.buildings.scoreMachine, "Score Machine"));

    let upgradePanel = document.createElement("span");
    upgradePanel.id = "upgradePanel";
    upgradePanel.setAttribute("style",
    `width:330px;
    height:625px;
    position:absolute;
    box-sizing:border-box;
    left:0;
    user-select:none;
    display:block;
    border:2px solid #888;
    border-radius:10px;
    background:#aaa;
    padding:8px;`);
    glob.upgradePanel = upgradePanel;
    let upgradeGrid = document.createElement("span");
    upgradeGrid.id = "upgradeGrid";
    upgradeGrid.setAttribute("style",
    `width:100%;
    height:531px;
    display:grid;
    grid-template-columns:repeat(auto-fill, 62px);;
    grid-template-rows:repeat(auto-fill, 62px);`);
    glob.upgradeGrid = upgradeGrid;
    upgradePanel.appendChild(upgradeGrid);
    let factionCoinPanel = document.createElement("span");
    factionCoinPanel.id = "factionCoinPanel";
    factionCoinPanel.classList.add("button");
    factionCoinPanel.setAttribute("style",
    `width:100%;
    height:65px;
    cursor:auto;
    padding:8px;
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    grid-template-rows:1fr 1fr;`);
    upgradePanel.appendChild(factionCoinPanel);

    let factionCoins = [
        "T", "O", "C",
        "I", "E", "S"
    ];

    for (let fac of factionCoins) {
        let factionCoinCounter = document.createElement("span");
        factionCoinCounter.id = "factionCoinCounter_" + fac;
        factionCoinCounter.innerText = fac;
        let factionCoinNumber = document.createElement("span");
        factionCoinNumber.id = "factionCoinNumber_" + fac;
        factionCoinNumber.innerText = beautifyNumber(9999999);
        factionCoinNumber.setAttribute("style",
        `background:#444;
        color:#eee;
        border:2px solid #222;
        display:inline-block;
        margin:0 8px;
        font-size:12px;
        padding:0 3px;
        width: 60px;`);
        factionCoinCounter.appendChild(factionCoinNumber);
        factionCoinPanel.appendChild(factionCoinCounter);

        glob.updateList.push(() => {
            factionCoinNumber.innerText = beautifyNumber(blob.factionCoins[factionCoins.indexOf(fac)]);
        });
    }

    let cheatPowerOutline = document.createElement("span");
    cheatPowerOutline.id = "cheatPowerContainer";
    cheatPowerOutline.classList.add("barOutline");
    cheatPowerOutline.setAttribute("style",
    `width: 300px;
    height: 30px;
    left: 339px;
    position: absolute;
    border-radius: 5px;`);
    let cheatPowerBar = document.createElement("span");
    cheatPowerBar.id = "cheatPowerBar";
    cheatPowerBar.classList.add("barFill");
    cheatPowerBar.classList.add("horizontal");
    cheatPowerBar.setAttribute("style",
    `background: #ddd;`);
    cheatPowerOutline.appendChild(cheatPowerBar);
    glob.cheatPowerBar = cheatPowerBar;
    let cheatPowerText = document.createElement("span");
    cheatPowerText.id = "cheatPowerText";
    cheatPowerText.setAttribute("style",
    `font-size:14px;
    line-height:30px;
    text-align:center;
    width:100%;
    display:block;
    position:relative;
    top:-29px;`);
    cheatPowerText.innerText = "Cheat Power: 0/0 : 0.00/s";
    cheatPowerOutline.appendChild(cheatPowerText);
    glob.cheatPowerText = cheatPowerText;

    let cheatList = document.createElement("span");
    cheatList.id = "cheatList";
    cheatList.setAttribute("style",
    `width:304px;
    height:430px;
    display:grid;
    grid-template-columns:100%;
    grid-template-rows:repeat(auto-fill, 60px);
    position:absolute;
    left:339px;
    top:40px;`);
    glob.cheatList = cheatList;

    let factionCoinTooltip = createTooltip(factionCoinPanel, '', "left:330px;top:-2px;width:294px;position:absolute;");
    glob.updateList.push(() => {
        factionCoinTooltip.innerHTML = `<b>Faction Favor</b>
<br/>Every time you click the button, there is a chance you will gain Favor with one of the 6 Factions.
<br/>Current chance: ${beautifyNumber(glob.factionCoinChance)}%
<br/><br/>Current Favor:
<br/>Traditionalists: ${beautifyNumber(blob.factionCoins[0])}
<br/>Orthodox: ${beautifyNumber(blob.factionCoins[1])}
<br/>Cultists: ${beautifyNumber(blob.factionCoins[2])}
<br/>Investors: ${beautifyNumber(blob.factionCoins[3])}
<br/>Executives: ${beautifyNumber(blob.factionCoins[4])}
<br/>Startups: ${beautifyNumber(blob.factionCoins[5])}`;
    });
    factionCoinPanel.appendChild(factionCoinTooltip);

    glob.upgrades = upgradeData;
    glob.cheats = cheatData;
    glob.effects = effectData;

    glob.screen.appendChild(bigButton);
    glob.screen.appendChild(cheatPowerOutline);
    glob.screen.appendChild(cheatList);
    glob.screen.appendChild(buildingPanel);
    glob.screen.appendChild(upgradePanel);
    glob.screen.appendChild(statsBar);

    glob.updateLoop = setTimeout(update, 1000 / glob.tps);
    glob.created = true;
}

function createBuilding(building) {
    let b = document.createElement("span");
    b.id = building.name.replace(/ /g, '');
    b.onclick = () => onBuildingClick(building);
    b.classList.add("button");
    b.setAttribute("style",
    `width:230px;
    height:55px;
    padding:5px;`);
    let bCount = document.createElement("span");
    bCount.innerHTML = `0 ${building.name}s<br/>Cost: 10`;
    b.appendChild(bCount);
    let sps = building.score * building.modifier * glob.globalBuildingModifier / 10000;
    let t = createTooltip(b, '', "right:248px;top:-2px;width:294px;position:absolute;");
    glob.updateList.push(() => {
        bCount.innerHTML = `${blob.buildings[building.id]} ${building.name}${blob.buildings[building.id] === 1 ? '' : 's'}<br/>Cost: ${beautifyNumber(realCost(building))}`;
        let sps = building.score * building.modifier * glob.globalBuildingModifier / 10000;
        t.innerHTML = `<b>${building.name}</b>
<br/>You have: ${beautifyNumber(blob.buildings[building.id])} ${building.name}${blob.buildings[building.id] === 1 ? '' : 's'}
<br/>The next one costs: ${beautifyNumber(realCost(building))}
<br/><br/>One produces: ${beautifyNumber(sps)} Score/s
<br/>All produce: ${beautifyNumber(sps * blob.buildings[building.id])} Score/s`;
    });
    b.appendChild(t);

    return b;
}

function createUpgradeCond(id, cond, pred, name, desc, cost) {
    glob.upgrades.push({
        id,
        cond,
        name,
        desc,
        cost,
        pred
    });
}

function createUpgrade(upgrade) {
    let u = document.createElement("span");
    u.id = upgrade.name.replace(/ /g, '');
    u.onclick = () => {
        if (upgrade.coinType !== undefined && upgrade.coinType >= 0) {
            if (blob.factionCoins[upgrade.coinType] >= upgrade.cost) {
                blob.factionCoins[upgrade.coinType] -= upgrade.cost;
                u.remove();
                upgrade.pred();
                blob.boughtUpgrades.push(upgrade.id);
            }
        } else {
            if (blob.score >= upgrade.cost) {
                blob.score -= upgrade.cost;
                u.remove();
                upgrade.pred();
                blob.boughtUpgrades.push(upgrade.id);
            }
        }
    };
    u.classList.add("button");
    u.setAttribute("style",
    `width:62px;
    height:62px;
    padding:5px;
    display:inline-block;`);
    let uImg = document.createElement("img");
    uImg.setAttribute("src", upgrade.img || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABvSURBVDhPvZJRDsAgCENh978zk0SNYks0W3w/GkAooJqZRFR1RZKrNZr56lnhz12kG9SMAbEasy3KHCQVGRzYIITpgRehVVi/Ksgg20H/oMGehRbPGoBzWcrQTbce0kpEPcIVXgW2Dra3xsQeQFMYQ2DRKIBS4AAAAASUVORK5CYII=");
    u.appendChild(uImg);
    u.appendChild(createTooltip(u, `<b>${upgrade.name}</b> - Cost: ${beautifyNumber(upgrade.cost)}<br/>${upgrade.desc}`, "top:10px;left:-7px;"));

    return u;
}

function createTooltip(origin, content, additionalStyle) {
    let t = document.createElement("span");
    t.id = origin.id + "_tooltip";
    t.classList.add("tooltip");
    if (additionalStyle) t.setAttribute("style", additionalStyle);
    t.style.display = "none";
    t.innerHTML = content;

    origin.onmouseover = () => showTooltip(origin.id + "_tooltip");
    origin.onmouseout  = () => hideTooltip(origin.id + "_tooltip");

    return t;
}

function createCheat(cheat) {
    let c = document.createElement("span");
    c.id = "cheat" + cheat.name.split(" ").join("");
    c.classList.add("button");
    c.setAttribute("style",
    `width:304px;`);
    c.onclick = () => useCheat(cheat);

    let cText = document.createElement("span");
    cText.innerHTML = `<b>${cheat.name}</b><br/>Cost - ${beautifyNumber(cheat.cost / 1000)}CP`;
    cText.setAttribute("style",
    `width:100%;
    text-align:center;
    display:block;
    line-height:18px;
    margin-top:5px;`);
    c.appendChild(cText);

    let cTooltip = createTooltip(c, `<b>${cheat.name}</b><br/>${cheat.desc}`,
    `top:20px;
    left:-2px;
    width:304px;
    box-sizing:border-box;`);
    c.appendChild(cTooltip);

    return c;
}

function createEffect(effectID) {
    let elementID = "cheat" + glob.effects[effectID].name.split(" ").join("");
    blob.activeEffects.push({
        id: effectID,
        duration: glob.effects[effectID].duration,
        element: elementID
    });
    createEffectBar(effectID);
    glob.effects[effectID].onEffect();
}
function createEffectBar(effectID) {
    let elementID = "cheat" + glob.effects[effectID].name.split(" ").join("");
    let element = document.getElementById(elementID);

    let barHolder = document.createElement("span");
    barHolder.setAttribute("style",
    `width: 100%;
    display: block;`);

    let barOutline = document.createElement("span");
    barOutline.classList.add("barOutline");
    barOutline.setAttribute("style",
    `width: 200px;
    border: 1px solid #222;
    border-radius: 5px;
    height: 8px;
    margin: 0 auto;`);

    let barFill = document.createElement("span");
    barFill.classList.add("barFill");
    barFill.classList.add("horizontal");
    barFill.setAttribute("style",
    `background: #0be;`);

    barOutline.appendChild(barFill);
    barHolder.appendChild(barOutline);

    element.appendChild(barHolder);
}

function showTooltip(id) {
    let t = document.getElementById(id);
    if (!t) return;
    t.style.display = "block";
}
function hideTooltip(id) {
    let t = document.getElementById(id);
    if (!t) return;
    t.style.display = "none";
}

function setFaction(factionID) {
    let newBuildings = factionBuildings[factionID];
    for (let nb of newBuildings) {
        glob.buildingPanel.appendChild(createBuilding(nb));
    }
    while (blob.buildings.length < newBuildings.length + 3) {
        blob.buildings.push(0);
    }
    for (let i = 0; i < factionUpgrades.length; i++) {
        if (i === factionID) continue;
        let upgradeButton = document.getElementById(factionUpgrades[i][0]);
        if (upgradeButton) upgradeButton.remove();
        let upgradesToRemove = glob.upgrades.filter(x => x.id === factionUpgrades[i][1]);
        if (upgradesToRemove.length) {
            for (let u of upgradesToRemove) {
                let uIndex = glob.upgrades.indexOf(u);
                if (uIndex === -1) continue;
                glob.upgrades.splice(uIndex, 1);
            }
        }
    }
    glob.factionID = factionID;
}
function setSubFaction(factionID) {
    for (let i = 0; i < subFactionUpgrades.length; i++) {
        if (i === factionID) continue;
        let upgradeButton = document.getElementById(subFactionUpgrades[i][0]);
        if (upgradeButton) upgradeButton.remove();
        let upgradesToRemove = glob.upgrades.filter(x => x.id === subFactionUpgrades[i][1]);
        if (upgradesToRemove.length) {
            for (let u of upgradesToRemove) {
                let uIndex = glob.upgrades.indexOf(u);
                if (uIndex === -1) continue;
                glob.upgrades.splice(uIndex, 1);
            }
        }
    }
    glob.subFactionID = factionID;
    glob.subFactionTier = 1;
}

function onBigButtonClick() {
    let power = glob.spc + (glob.productionAsClick * glob.sps);
    power += glob.tick.clickBonus;
    power *= glob.clickModifier;
    power *= glob.tick.clickModifier;
    blob.score += power;
    blob.stats.clickCount++;
    blob.stats.clickValue += power;

    let chanceToken = Math.random() * 100;
    let count = Math.floor(glob.factionCoinChance / 100) + (chanceToken <= glob.factionCoinChance % 100 ? 1 : 0);
    if (count > 0) {
        let faction = randInt(0, 5);
        blob.factionCoins[faction] += count;
    }
}

function onBuildingClick(b) {
    if (blob.score >= realCost(b)) {
        blob.score -= realCost(b);
        blob.buildings[b.id]++;
    }
}

function useCheat(cheat) {
    if (blob.cheatPower >= cheat.cost) {
        blob.cheatPower -= cheat.cost;
        cheat.pred();
    }
}

function realCost(building) {
    let count = blob.buildings[building.id];
    let cost = building.cost;
    for (let i = 0; i < count; i++) {
        cost *= building.costMult;
    }
    for (let i = 0; i < count; i++) {
        cost /= 100000;
    }

    return cost / 1000;
}

var suffixes = [
    'm','b','t','qa','qi','sx','sp','oc','no','dc'
];

function beautifyNumber(n, d) {
    let strN = n.toString();
    if (strN.length <= 7) return commatizeNumber(n, d);
    let suffix = suffixes[Math.floor((strN.length - 7) / 3)];
    let charLen = strN.length % 3;
    charLen = charLen === 0 ? 3 : charLen;
    let num = strN.substring(0, charLen);
    let dec = strN.substr(charLen, 3);
    dec = dec.replace(/0+$/, '');
    return `${num}${dec.length > 0 ? "." + dec : ""}${suffix}`;
}

function commatizeNumber(n, d) {
    let strN = n.toString().split("").reverse().join("");
    let dec;
    if (d) {
        dec = strN.substring(0, d).split("").reverse().join("");
        strN = strN.substring(d);
    }
    let str = '';
    for (let i = 0; i < strN.length; i++) {
        if (i > 0 && i % 3 === 0) str += ',';
        str += strN[i];
    }
    return str.split("").reverse().join("") + (d ? "." + dec : "");
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}