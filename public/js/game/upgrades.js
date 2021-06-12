BigInt.prototype.modifyPercentage = function(percent) {
    let p = percent * 100;
    return (this / 100) * p;
};

/*
 * Upgrade IDs:
 * 1-6: Base click
 * 7-11: Treasure
 * 12-33: Score Well
 * 34-55: Score Printer
 * 56-77: Score Machine
 * 78-79: Alignment
 * 80-101: Score Chapel
 * 102-123: Score Church
 * 124-145: Score Abbey
 * 146-167: Score Monastery
 * 168-189: Score Cathedral
 * 190-211: Score Parthenon
 * 212-233: Score Vatican
 * 234-255: Score Mine
 * 256-277: Score Drill
 * 278-299: Score Quarry
 * 300-321: Score Rig
 * 322-343: Score Foundry
 * 344-365: Score Factory
 * 366-387: Score Megafactory
 * 388-392: Production as Click
 * 393-398: Factions
 * 399-409: Traditionalist
 * 410-420: Orthodox
 * 421-431: Cultist
 * 432-442: Executive
 * 443-453: Investor
 * 454-464: Startup
 * 465-471: Cheat Power
 */

var upgradeData = [

    /* =Base click= */

    {
        id: 1,
        cond: () => blob.stats.clickCount >= 100,
        pred: () => { glob.spc += 4; },
        name: "Sturdy Button",
        desc: "Increases base clicking score by 4",
        cost: 500,
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACDSURBVDhPlY8BDsAgCANl//+zWwk16GR2l5ggoadY770BM/PiuZs3BJC5onYQpkhlEoA/Esy+BIASRbQVAEiU35QCcpIcBeBrJUkAqpVkAVklkgCBfKLtlIJ1kCvwRHsvQBhDlOR65SVgOK5HJsEazi/nOjMEGMhhFYSirMm/8MagtRua/WoZhMcCZwAAAABJRU5ErkJggg=="
    },
    {
        id: 2,
        cond: () => blob.stats.clickCount >= 500,
        pred: () => { glob.spc += 45; },
        name: "Durable Button",
        desc: "Increases base clicking score by 45",
        cost: 5000,
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACHSURBVDhPjY8BDsAgCANl//+zWwk16ER7iREInGi99wbMzIMvNy8cQC/6cD9Rc1iMVGISAEXCLXH/BIASZZutAECibFMKyE1yFYDTlyQBqL4kC8gqkQQYyCfKTilYG/kFnijvBRhGEyU5XvkJOBzplUmwDueXc5wZAjTkYRUMRViTt/DCoLUX98pxF+I+YDAAAAAASUVORK5CYII="
    },
    {
        id: 3,
        cond: () => blob.stats.clickCount >= 2500,
        pred: () => { glob.spc += 4950; },
        name: "Reinforced Button",
        desc: "Increases base clicking score by 4,950",
        cost: 5e6,
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACKSURBVDhPjY+BDsAwBAVr///P3Z54ixrjkmYoN5W99wIiosGTixYS0IN7/73sTmHR0hHHBhDEuOPYgGAYksk2qQBAQpGVUkoB6SStAPw9aSQA1ZPGAhIlIwEG/LGyUgpiI5/AY+VcgGE0UeLjyEfAYUtbDkEc9/2secVoMEPT8GQhTV+Cy28rHUDCEd2F06BgAAAAAASUVORK5CYII="
    },
    {
        id: 4,
        cond: () => blob.stats.clickCount >= 10000,
        pred: () => { glob.spc += 5e5; },
        name: "Resilient Button",
        desc: "Increases base clicking score by 500,000",
        cost: 5e9,
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACLSURBVDhPjY8BDsAgCANl//+zWwk11YlyiRkg3MR67w2YmQdfbl7YgB7c6/eJO4fFSFNUMgnASYK7CEf8EwBKMpGyFQBITq8hqYDcJFcBOK1UEoBspbKArJKSAAN6ouykgrWRK/BEeS/AMJoo0XjlJ+BwpFcmwTqsf9ZYGQI06HAVDEWYo6/wwqC1F6H1fBWyS2pqAAAAAElFTkSuQmCC"
    },
    {
        id: 5,
        cond: () => blob.stats.clickCount >= 50000,
        pred: () => { glob.spc += 5e7; },
        name: "Unbreakable Button",
        desc: "Increases base clicking score by 50m",
        cost: 5e13,
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACJSURBVDhPlY8BDsQgCASl//+z1yFsQ22p3CRGIDCKzTkHmJkHZ25e+IBe+riPqDkqRlqiPu6bAP6RcD8EIElH9CoAJJ3flAKxk2wF8LVSSwDVSm2BWCUtAQP5RNkpBWujVtCJ8ruAYZokyfHKQ6DhSLfcBOtwfjnHmUtAQx7uwlCENfkXXrgY4wcNOHUX3eDDtAAAAABJRU5ErkJggg=="
    },
    {
        id: 6,
        cond: () => blob.stats.clickCount >= 100000,
        pred: () => { glob.spc += 5e10; },
        name: "Eternal Button",
        desc: "Increases base clicking score by 50b",
        cost: 5e15,
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACMSURBVDhPjY8BDsAgCANl//+zWwk1YpyiRkivan13hswMy++vXljA2Zwrt8zhw2Y7ug4Wi1wBUJFF6vQgAJScR2QoAJLfbgFRAbpKrAJyeVBKA7EllAZklJQECuqLtpIJ5kE/givZegDCGKNF6ZhEwHNsrP8Ec1j9rrQwBBjRcBaEoc/QW3hi09gLB9XwVB3HdwAAAABJRU5ErkJggg=="
    },
    
    /* =Treasure= */

    {
        id: 7,
        cond: () => blob.stats.clickValue >= 5000,
        pred: () => { glob.globalBuildingModifier += 25; glob.clickModifier += 25 },
        name: "Shiny Button",
        desc: "Increase clicking reward and the production of all buildings by 25%",
        cost: 10000
    },
    {
        id: 8,
        cond: () => blob.stats.clickValue >= 5e6,
        pred: () => { glob.globalBuildingModifier += 25; glob.clickModifier += 25 },
        name: "Rich Button",
        desc: "Increase clicking reward and the production of all buildings by 25%",
        cost: 5e7
    },
    {
        id: 9,
        cond: () => blob.stats.clickValue >= 5e9,
        pred: () => { glob.globalBuildingModifier += 25; glob.clickModifier += 25 },
        name: "Wealthy Button",
        desc: "Increase clicking reward and the production of all buildings by 25%",
        cost: 1e11
    },
    {
        id: 10,
        cond: () => blob.stats.clickValue >= 5e12,
        pred: () => { glob.globalBuildingModifier += 25; glob.clickModifier += 25 },
        name: "Opulent Button",
        desc: "Increase clicking reward and the production of all buildings by 25%",
        cost: 1.5e14
    },
    {
        id: 11,
        cond: () => blob.stats.clickValue >= 5e15,
        pred: () => { glob.globalBuildingModifier += 25; glob.clickModifier += 25 },
        name: "Luxurious Button",
        desc: "Increase clicking reward and the production of all buildings by 25%",
        cost: 2e17
    },

    /* =Score Well= */
    
    {
        id: 12,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 5,
        pred: () => { glob.buildings.scoreWell.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Well 1",
        desc: "Increases Score Well power by 100%",
        cost: 0
    },
    {
        id: 13,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 25,
        pred: () => { glob.buildings.scoreWell.modifier *= 3; glob.autoclickers += 1; },
        name: "Score Well 2",
        desc: "Increases Score Well power by 200%",
        cost: 6580
    },
    {
        id: 14,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 75,
        pred: () => { glob.buildings.scoreWell.modifier *= 4; },
        name: "Score Well 3",
        desc: "Increases Score Well power by 300%",
        cost: 1.07e7
    },
    {
        id: 15,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 150,
        pred: () => { glob.buildings.scoreWell.modifier *= 5; },
        name: "Score Well 4",
        desc: "Increases Score Well power by 400%",
        cost: 5.09e11
    },
    {
        id: 16,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 200,
        pred: () => { glob.buildings.scoreWell.modifier *= 6; },
        name: "Score Well 5",
        desc: "Increases Score Well power by 500%",
        cost: 6.895e14
    },
    {
        id: 17,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 300,
        pred: () => { glob.buildings.scoreWell.modifier *= 5; },
        name: "Score Well 6",
        desc: "Increases Score Well power by 400%",
        cost: 9.716e20
    },
    {
        id: 18,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 400,
        pred: () => { glob.buildings.scoreWell.modifier *= 4; },
        name: "Score Well 7",
        desc: "Increases Score Well power by 300%",
        cost: 1.331e27
    },
    {
        id: 19,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 500,
        pred: () => { glob.buildings.scoreWell.modifier *= 3; },
        name: "Score Well 8",
        desc: "Increases Score Well power by 200%",
        cost: 1.786e33
    },
    {
        id: 20,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 600,
        pred: () => { glob.buildings.scoreWell.modifier *= 2; },
        name: "Score Well 9",
        desc: "Increases Score Well power by 100%",
        cost: 2.36e39
    },
    {
        id: 21,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 700,
        pred: () => { glob.buildings.scoreWell.modifier *= 3; },
        name: "Score Well 10",
        desc: "Increases Score Well power by 200%",
        cost: 3.08e45
    },
    {
        id: 22,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 800,
        pred: () => { glob.buildings.scoreWell.modifier *= 4; },
        name: "Score Well 11",
        desc: "Increases Score Well power by 300%",
        cost: 3.978e51
    },
    {
        id: 23,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 900,
        pred: () => { glob.buildings.scoreWell.modifier *= 5; },
        name: "Score Well 12",
        desc: "Increases Score Well power by 400%",
        cost: 5.096e57
    },
    {
        id: 24,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 1000,
        pred: () => { glob.buildings.scoreWell.modifier *= 6; },
        name: "Score Well 13",
        desc: "Increases Score Well power by 500%",
        cost: 6.438e63
    },
    {
        id: 25,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 1100,
        pred: () => { glob.buildings.scoreWell.modifier *= 5; },
        name: "Score Well 14",
        desc: "Increases Score Well power by 400%",
        cost: 8.199e69
    },
    {
        id: 26,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 1250,
        pred: () => { glob.buildings.scoreWell.modifier *= 4; },
        name: "Score Well 15",
        desc: "Increases Score Well power by 300%",
        cost: 1.118e79
    },
    {
        id: 27,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 1500,
        pred: () => { glob.buildings.scoreWell.modifier *= 5; },
        name: "Score Well 16",
        desc: "Increases Score Well power by 400%",
        cost: 1.782e94
    },
    {
        id: 28,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 1750,
        pred: () => { glob.buildings.scoreWell.modifier *= 6; },
        name: "Score Well 17",
        desc: "Increases Score Well power by 500%",
        cost: 2.829e109
    },
    {
        id: 29,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 2000,
        pred: () => { glob.buildings.scoreWell.modifier *= 5; },
        name: "Score Well 18",
        desc: "Increases Score Well power by 400%",
        cost: 4.477e124
    },
    {
        id: 30,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 2500,
        pred: () => { glob.buildings.scoreWell.modifier *= 4; },
        name: "Score Well 19",
        desc: "Increases Score Well power by 300%",
        cost: 1.055e155
    },
    {
        id: 31,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 3500 && false,
        pred: () => { glob.buildings.scoreWell.modifier *= 61; },
        name: "Score Well 20",
        desc: "Increases Score Well power by 6000%",
        cost: 1.703e51
    },
    {
        id: 32,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 4000 && false,
        pred: () => { glob.buildings.scoreWell.modifier *= 71; },
        name: "Score Well 21",
        desc: "Increases Score Well power by 7000%",
        cost: 4.689e54
    },
    {
        id: 33,
        cond: () => blob.buildings[glob.buildings.scoreWell.id] >= 10000 && false,
        pred: () => { glob.buildings.scoreWell.modifier *= 81; },
        name: "Score Well 22",
        desc: "Increases Score Well power by 8000%",
        cost: 5.184e131
    },

    /* =Score Printer= */
    
    {
        id: 34,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 5,
        pred: () => { glob.buildings.scorePrinter.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Printer 1",
        desc: "Increases Score Printer power by 100%",
        cost: 2510
    },
    {
        id: 35,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 25,
        pred: () => { glob.buildings.scorePrinter.modifier *= 3; glob.autoclickers += 1; },
        name: "Score Printer 2",
        desc: "Increases Score Printer power by 200%",
        cost: 82300
    },
    {
        id: 36,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 75,
        pred: () => { glob.buildings.scorePrinter.modifier *= 4; },
        name: "Score Printer 3",
        desc: "Increases Score Printer power by 300%",
        cost: 1.338e8
    },
    {
        id: 37,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 150,
        pred: () => { glob.buildings.scorePrinter.modifier *= 5; },
        name: "Score Printer 4",
        desc: "Increases Score Printer power by 400%",
        cost: 6.363e12
    },
    {
        id: 38,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 200,
        pred: () => { glob.buildings.scorePrinter.modifier *= 6; },
        name: "Score Printer 5",
        desc: "Increases Score Printer power by 500%",
        cost: 8.619e15
    },
    {
        id: 39,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 300,
        pred: () => { glob.buildings.scorePrinter.modifier *= 5; },
        name: "Score Printer 6",
        desc: "Increases Score Printer power by 400%",
        cost: 1.215e22
    },
    {
        id: 40,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 400,
        pred: () => { glob.buildings.scorePrinter.modifier *= 4; },
        name: "Score Printer 7",
        desc: "Increases Score Printer power by 300%",
        cost: 1.663e28
    },
    {
        id: 41,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 500,
        pred: () => { glob.buildings.scorePrinter.modifier *= 3; },
        name: "Score Printer 8",
        desc: "Increases Score Printer power by 200%",
        cost: 2.233e34
    },
    {
        id: 42,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 600,
        pred: () => { glob.buildings.scorePrinter.modifier *= 2; },
        name: "Score Printer 9",
        desc: "Increases Score Printer power by 100%",
        cost: 2.95e40
    },
    {
        id: 43,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 700,
        pred: () => { glob.buildings.scorePrinter.modifier *= 3; },
        name: "Score Printer 10",
        desc: "Increases Score Printer power by 200%",
        cost: 3.849e46
    },
    {
        id: 44,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 800,
        pred: () => { glob.buildings.scorePrinter.modifier *= 4; },
        name: "Score Printer 11",
        desc: "Increases Score Printer power by 300%",
        cost: 4.973e52
    },
    {
        id: 45,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 900,
        pred: () => { glob.buildings.scorePrinter.modifier *= 5; },
        name: "Score Printer 12",
        desc: "Increases Score Printer power by 400%",
        cost: 6.37e58
    },
    {
        id: 46,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 1000,
        pred: () => { glob.buildings.scorePrinter.modifier *= 6; },
        name: "Score Printer 13",
        desc: "Increases Score Printer power by 500%",
        cost: 8.104e64
    },
    {
        id: 47,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 1100,
        pred: () => { glob.buildings.scorePrinter.modifier *= 5; },
        name: "Score Printer 14",
        desc: "Increases Score Printer power by 400%",
        cost: 1.025e71
    },
    {
        id: 48,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 1250,
        pred: () => { glob.buildings.scorePrinter.modifier *= 4; },
        name: "Score Printer 15",
        desc: "Increases Score Printer power by 300%",
        cost: 1.397e80
    },
    {
        id: 49,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 1500,
        pred: () => { glob.buildings.scorePrinter.modifier *= 5; },
        name: "Score Printer 16",
        desc: "Increases Score Printer power by 400%",
        cost: 2.27e94
    },
    {
        id: 50,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 1750,
        pred: () => { glob.buildings.scorePrinter.modifier *= 6; },
        name: "Score Printer 17",
        desc: "Increases Score Printer power by 500%",
        cost: 3.537e110
    },
    {
        id: 51,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 2000,
        pred: () => { glob.buildings.scorePrinter.modifier *= 5; },
        name: "Score Printer 18",
        desc: "Increases Score Printer power by 400%",
        cost: 5.596e125
    },
    {
        id: 52,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 2500,
        pred: () => { glob.buildings.scorePrinter.modifier *= 4; },
        name: "Score Printer 19",
        desc: "Increases Score Printer power by 300%",
        cost: 1.319e156
    },
    {
        id: 53,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 3500 && false,
        pred: () => { glob.buildings.scorePrinter.modifier *= 61; },
        name: "Score Printer 20",
        desc: "Increases Score Printer power by 6000%",
        cost: 2.129e49
    },
    {
        id: 54,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 4000 && false,
        pred: () => { glob.buildings.scorePrinter.modifier *= 71; },
        name: "Score Printer 21",
        desc: "Increases Score Printer power by 7000%",
        cost: 4.689e48
    },
    {
        id: 55,
        cond: () => blob.buildings[glob.buildings.scorePrinter.id] >= 10000 && false,
        pred: () => { glob.buildings.scorePrinter.modifier *= 81; },
        name: "Score Printer 22",
        desc: "Increases Score Printer power by 8000%",
        cost: 6.48e132
    },

    /* =Score Machine= */
    
    {
        id: 56,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 5,
        pred: () => { glob.buildings.scoreMachine.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Machine 1",
        desc: "Increases Score Machine power by 100%",
        cost: 12070
    },
    {
        id: 57,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 25,
        pred: () => { glob.buildings.scoreMachine.modifier *= 3; glob.autoclickers += 1; },
        name: "Score Machine 2",
        desc: "Increases Score Machine power by 200%",
        cost: 395020
    },
    {
        id: 58,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 75,
        pred: () => { glob.buildings.scoreMachine.modifier *= 4; },
        name: "Score Machine 3",
        desc: "Increases Score Machine power by 300%",
        cost: 6.421e8
    },
    {
        id: 59,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 150,
        pred: () => { glob.buildings.scoreMachine.modifier *= 5; },
        name: "Score Machine 4",
        desc: "Increases Score Machine power by 400%",
        cost: 3.054e13
    },
    {
        id: 60,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 200,
        pred: () => { glob.buildings.scoreMachine.modifier *= 6; },
        name: "Score Machine 5",
        desc: "Increases Score Machine power by 500%",
        cost: 4.137e16
    },
    {
        id: 61,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 300,
        pred: () => { glob.buildings.scoreMachine.modifier *= 5; },
        name: "Score Machine 6",
        desc: "Increases Score Machine power by 400%",
        cost: 5.829e22
    },
    {
        id: 62,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 400,
        pred: () => { glob.buildings.scoreMachine.modifier *= 4; },
        name: "Score Machine 7",
        desc: "Increases Score Machine power by 300%",
        cost: 7.987e28
    },
    {
        id: 63,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 500,
        pred: () => { glob.buildings.scoreMachine.modifier *= 3; },
        name: "Score Machine 8",
        desc: "Increases Score Machine power by 200%",
        cost: 1.071e35
    },
    {
        id: 64,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 600,
        pred: () => { glob.buildings.scoreMachine.modifier *= 2; },
        name: "Score Machine 9",
        desc: "Increases Score Machine power by 100%",
        cost: 1.416e41
    },
    {
        id: 65,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 700,
        pred: () => { glob.buildings.scoreMachine.modifier *= 3; },
        name: "Score Machine 10",
        desc: "Increases Score Machine power by 200%",
        cost: 1.848e47
    },
    {
        id: 66,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 800,
        pred: () => { glob.buildings.scoreMachine.modifier *= 4; },
        name: "Score Machine 11",
        desc: "Increases Score Machine power by 300%",
        cost: 2.387e53
    },
    {
        id: 67,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 900,
        pred: () => { glob.buildings.scoreMachine.modifier *= 5; },
        name: "Score Machine 12",
        desc: "Increases Score Machine power by 400%",
        cost: 3.058e59
    },
    {
        id: 68,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 1000,
        pred: () => { glob.buildings.scoreMachine.modifier *= 6; },
        name: "Score Machine 13",
        desc: "Increases Score Machine power by 500%",
        cost: 3.89e65
    },
    {
        id: 69,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 1100,
        pred: () => { glob.buildings.scoreMachine.modifier *= 5; },
        name: "Score Machine 14",
        desc: "Increases Score Machine power by 400%",
        cost: 4.919e71
    },
    {
        id: 70,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 1250,
        pred: () => { glob.buildings.scoreMachine.modifier *= 4; },
        name: "Score Machine 15",
        desc: "Increases Score Machine power by 300%",
        cost: 6.707e80
    },
    {
        id: 71,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 1500,
        pred: () => { glob.buildings.scoreMachine.modifier *= 5; },
        name: "Score Machine 16",
        desc: "Increases Score Machine power by 400%",
        cost: 1.069e96
    },
    {
        id: 72,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 1750,
        pred: () => { glob.buildings.scoreMachine.modifier *= 6; },
        name: "Score Machine 17",
        desc: "Increases Score Machine power by 500%",
        cost: 1.698e111
    },
    {
        id: 73,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 2000,
        pred: () => { glob.buildings.scoreMachine.modifier *= 5; },
        name: "Score Machine 18",
        desc: "Increases Score Machine power by 400%",
        cost: 2.686e126
    },
    {
        id: 74,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 2500,
        pred: () => { glob.buildings.scoreMachine.modifier *= 4; },
        name: "Score Machine 19",
        desc: "Increases Score Machine power by 300%",
        cost: 6.331e156
    },
    {
        id: 75,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 3500 && false,
        pred: () => { glob.buildings.scoreMachine.modifier *= 61; },
        name: "Score Machine 20",
        desc: "Increases Score Machine power by 6000%",
        cost: 1.022e50
    },
    {
        id: 76,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 4000 && false,
        pred: () => { glob.buildings.scoreMachine.modifier *= 71; },
        name: "Score Machine 21",
        desc: "Increases Score Machine power by 7000%",
        cost: 2.814e56
    },
    {
        id: 77,
        cond: () => blob.buildings[glob.buildings.scoreMachine.id] >= 10000 && false,
        pred: () => { glob.buildings.scoreMachine.modifier *= 81; },
        name: "Score Machine 22",
        desc: "Increases Score Machine power by 8000%",
        cost: 3.11e133
    },

    /* =Alignment= */
    
    {
        id: 78,
        cond: () => true,
        pred: () => { setFaction(0); },
        name: "Score Religion",
        desc: "Begin a religion worshipping score. This locks Score Industry",
        cost: 25000,
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACRSURBVDhPtVGBDcAgCIP9/7blRoEzJZla0LAQitRba3JDqram9eMdqLAYTkBYggRNKpQGlBsx77BzmS7wVMsBrwl3oiaG6VNrkaPUY7M8D3PMSPmL/hb7uBn0xugyTCq5IhpAEcMINPdgzxnjF43qIQRcebbb3yDfwziQ6EGZ8cFpUEUREMPdKzMoMlOLCJyAjcsgvc3dEeIAAAAAElFTkSuQmCC"
    },
    {
        id: 79,
        cond: () => true,
        pred: () => { setFaction(1); },
        name: "Score Industry",
        desc: "Harvest the very earth itself for more score. This locks Score Religion",
        cost: 25000,
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB7SURBVDhPpZAJDsAgCASh//+z7RpsBFeC7SQNXjtKtbUmf+gCVV0sz7raMMW9gIlAJqMtnIjSf1Bp7bJKoTcGaSoYMNEgFeA2hOOt83wrmMOo+GzLQQUxbMu0lUWwC0ewj+oElXBcfwWVMKMLTsPzmeUFNi2DlA2/IHIDPvBwBb74FK0AAAAASUVORK5CYII="
    },

    /* =Score Chapel= */
    
    {
        id: 80,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 5 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Chapel 1",
        desc: "Increases Score Chapel power by 100%",
        cost: 36200
    },
    {
        id: 81,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 25 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Chapel 2",
        desc: "Increases Score Chapel power by 100%",
        cost: 1.185e6
    },
    {
        id: 82,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 75 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 2; },
        name: "Score Chapel 3",
        desc: "Increases Score Chapel power by 100%",
        cost: 1.926e9
    },
    {
        id: 83,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 150 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 2; },
        name: "Score Chapel 4",
        desc: "Increases Score Chapel power by 100%",
        cost: 9.162e13
    },
    {
        id: 84,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 200 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 2; },
        name: "Score Chapel 5",
        desc: "Increases Score Chapel power by 100%",
        cost: 1.241e17
    },
    {
        id: 85,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 300 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 3; },
        name: "Score Chapel 6",
        desc: "Increases Score Chapel power by 200%",
        cost: 1.749e23
    },
    {
        id: 86,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 400 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 3; },
        name: "Score Chapel 7",
        desc: "Increases Score Chapel power by 200%",
        cost: 2.396e29
    },
    {
        id: 87,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 3; },
        name: "Score Chapel 8",
        desc: "Increases Score Chapel power by 200%",
        cost: 3.216e35
    },
    {
        id: 88,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 600 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 3; },
        name: "Score Chapel 9",
        desc: "Increases Score Chapel power by 200%",
        cost: 4.248e41
    },
    {
        id: 89,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 700 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 3; },
        name: "Score Chapel 10",
        desc: "Increases Score Chapel power by 200%",
        cost: 5.543e47
    },
    {
        id: 90,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 800 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 4; },
        name: "Score Chapel 11",
        desc: "Increases Score Chapel power by 300%",
        cost: 7.16e53
    },
    {
        id: 91,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 900 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 4; },
        name: "Score Chapel 12",
        desc: "Increases Score Chapel power by 300%",
        cost: 9.173e59
    },
    {
        id: 92,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 1000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 4; },
        name: "Score Chapel 13",
        desc: "Increases Score Chapel power by 300%",
        cost: 1.167e66
    },
    {
        id: 93,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 1100 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 4; },
        name: "Score Chapel 14",
        desc: "Increases Score Chapel power by 300%",
        cost: 1.476e72
    },
    {
        id: 94,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 1250 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 4; },
        name: "Score Chapel 15",
        desc: "Increases Score Chapel power by 300%",
        cost: 2.012e81
    },
    {
        id: 95,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 1500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 5; },
        name: "Score Chapel 16",
        desc: "Increases Score Chapel power by 400%",
        cost: 3.207e96
    },
    {
        id: 96,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 1750 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 5; },
        name: "Score Chapel 17",
        desc: "Increases Score Chapel power by 400%",
        cost: 5.093e111
    },
    {
        id: 97,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 2000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 5; },
        name: "Score Chapel 18",
        desc: "Increases Score Chapel power by 400%",
        cost: 8.058e126
    },
    {
        id: 98,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 2500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChapel.modifier *= 5; },
        name: "Score Chapel 19",
        desc: "Increases Score Chapel power by 400%",
        cost: 1.899e157
    },
    {
        id: 99,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 3500 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreChapel.modifier *= 51; },
        name: "Score Chapel 20",
        desc: "Increases Score Chapel power by 5000%",
        cost: 3.066e50
    },
    {
        id: 100,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 4000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreChapel.modifier *= 51; },
        name: "Score Chapel 21",
        desc: "Increases Score Chapel power by 5000%",
        cost: 8.441e56
    },
    {
        id: 101,
        cond: () => blob.buildings[glob.buildings.scoreChapel.id] >= 10000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreChapel.modifier *= 51; },
        name: "Score Chapel 22",
        desc: "Increases Score Chapel power by 5000%",
        cost: 9.331e133
    },

    /* =Score Church= */
    
    {
        id: 102,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 5 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Church 1",
        desc: "Increases Score Church power by 100%",
        cost: 112640
    },
    {
        id: 103,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 25 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Church 2",
        desc: "Increases Score Church power by 100%",
        cost: 3.687e6
    },
    {
        id: 104,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 75 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 2; },
        name: "Score Church 3",
        desc: "Increases Score Church power by 100%",
        cost: 5.993e9
    },
    {
        id: 105,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 150 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 2; },
        name: "Score Church 4",
        desc: "Increases Score Church power by 100%",
        cost: 2.851e14
    },
    {
        id: 106,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 200 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 2; },
        name: "Score Church 5",
        desc: "Increases Score Church power by 100%",
        cost: 3.861e17
    },
    {
        id: 107,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 300 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 3; },
        name: "Score Church 6",
        desc: "Increases Score Church power by 200%",
        cost: 5.441e23
    },
    {
        id: 108,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 400 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 3; },
        name: "Score Church 7",
        desc: "Increases Score Church power by 200%",
        cost: 7.455e29
    },
    {
        id: 109,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 3; },
        name: "Score Church 8",
        desc: "Increases Score Church power by 200%",
        cost: 1e36
    },
    {
        id: 110,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 600 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 3; },
        name: "Score Church 9",
        desc: "Increases Score Church power by 200%",
        cost: 1.322e42
    },
    {
        id: 111,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 700 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 3; },
        name: "Score Church 10",
        desc: "Increases Score Church power by 200%",
        cost: 1.725e48
    },
    {
        id: 112,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 800 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 4; },
        name: "Score Church 11",
        desc: "Increases Score Church power by 300%",
        cost: 2.228e54
    },
    {
        id: 113,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 900 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 4; },
        name: "Score Church 12",
        desc: "Increases Score Church power by 300%",
        cost: 2.854e60
    },
    {
        id: 114,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 1000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 4; },
        name: "Score Church 13",
        desc: "Increases Score Church power by 300%",
        cost: 3.631e66
    },
    {
        id: 115,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 1100 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 4; },
        name: "Score Church 14",
        desc: "Increases Score Church power by 300%",
        cost: 4.591e72
    },
    {
        id: 116,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 1250 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 4; },
        name: "Score Church 15",
        desc: "Increases Score Church power by 300%",
        cost: 6.26e81
    },
    {
        id: 117,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 1500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 5; },
        name: "Score Church 16",
        desc: "Increases Score Church power by 400%",
        cost: 9.979e96
    },
    {
        id: 118,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 1750 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 5; },
        name: "Score Church 17",
        desc: "Increases Score Church power by 400%",
        cost: 1.584e112
    },
    {
        id: 119,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 2000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 5; },
        name: "Score Church 18",
        desc: "Increases Score Church power by 400%",
        cost: 2.507e127
    },
    {
        id: 120,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 2500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreChurch.modifier *= 5; },
        name: "Score Church 19",
        desc: "Increases Score Church power by 400%",
        cost: 5.909e157
    },
    {
        id: 121,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 3500 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreChurch.modifier *= 51; },
        name: "Score Church 20",
        desc: "Increases Score Church power by 5000%",
        cost: 9.539e50
    },
    {
        id: 122,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 4000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreChurch.modifier *= 51; },
        name: "Score Church 21",
        desc: "Increases Score Church power by 5000%",
        cost: 2.626e57
    },
    {
        id: 123,
        cond: () => blob.buildings[glob.buildings.scoreChurch.id] >= 10000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreChurch.modifier *= 51; },
        name: "Score Church 22",
        desc: "Increases Score Church power by 5000%",
        cost: 2.903e134
    },

    /* =Score Abbey= */
    
    {
        id: 124,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 5 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Abbey 1",
        desc: "Increases Score Abbey power by 100%",
        cost: 764320
    },
    {
        id: 125,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 25 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Abbey 2",
        desc: "Increases Score Abbey power by 100%",
        cost: 2.502e7
    },
    {
        id: 126,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 75 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 2; },
        name: "Score Abbey 3",
        desc: "Increases Score Abbey power by 100%",
        cost: 4.067e10
    },
    {
        id: 127,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 150 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 2; },
        name: "Score Abbey 4",
        desc: "Increases Score Abbey power by 100%",
        cost: 1.934e15
    },
    {
        id: 128,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 200 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 2; },
        name: "Score Abbey 5",
        desc: "Increases Score Abbey power by 100%",
        cost: 2.62e18
    },
    {
        id: 129,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 300 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 3; },
        name: "Score Abbey 6",
        desc: "Increases Score Abbey power by 200%",
        cost: 3.692e24
    },
    {
        id: 130,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 400 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 3; },
        name: "Score Abbey 7",
        desc: "Increases Score Abbey power by 200%",
        cost: 5.058e30
    },
    {
        id: 131,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 3; },
        name: "Score Abbey 8",
        desc: "Increases Score Abbey power by 200%",
        cost: 6.789e36
    },
    {
        id: 132,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 600 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 3; },
        name: "Score Abbey 9",
        desc: "Increases Score Abbey power by 200%",
        cost: 8.969e42
    },
    {
        id: 133,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 700 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 3; },
        name: "Score Abbey 10",
        desc: "Increases Score Abbey power by 200%",
        cost: 1.17e49
    },
    {
        id: 134,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 800 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 4; },
        name: "Score Abbey 11",
        desc: "Increases Score Abbey power by 300%",
        cost: 1.512e55
    },
    {
        id: 135,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 900 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 4; },
        name: "Score Abbey 12",
        desc: "Increases Score Abbey power by 300%",
        cost: 1.937e61
    },
    {
        id: 136,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 1000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 4; },
        name: "Score Abbey 13",
        desc: "Increases Score Abbey power by 300%",
        cost: 2.464e67
    },
    {
        id: 137,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 1100 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 4; },
        name: "Score Abbey 14",
        desc: "Increases Score Abbey power by 300%",
        cost: 3.116e73
    },
    {
        id: 138,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 1250 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 4; },
        name: "Score Abbey 15",
        desc: "Increases Score Abbey power by 300%",
        cost: 4.248e82
    },
    {
        id: 139,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 1500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 5; },
        name: "Score Abbey 16",
        desc: "Increases Score Abbey power by 400%",
        cost: 6.771e97
    },
    {
        id: 140,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 1750 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 5; },
        name: "Score Abbey 17",
        desc: "Increases Score Abbey power by 400%",
        cost: 1.075e113
    },
    {
        id: 141,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 2000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 5; },
        name: "Score Abbey 18",
        desc: "Increases Score Abbey power by 400%",
        cost: 1.701e128
    },
    {
        id: 142,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 2500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 5; },
        name: "Score Abbey 19",
        desc: "Increases Score Abbey power by 400%",
        cost: 4.01e158
    },
    {
        id: 143,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 3500 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 51; },
        name: "Score Abbey 20",
        desc: "Increases Score Abbey power by 5000%",
        cost: 6.473e51
    },
    {
        id: 144,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 4000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 51; },
        name: "Score Abbey 21",
        desc: "Increases Score Abbey power by 5000%",
        cost: 1.782e58
    },
    {
        id: 145,
        cond: () => blob.buildings[glob.buildings.scoreAbbey.id] >= 10000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreAbbey.modifier *= 51; },
        name: "Score Abbey 22",
        desc: "Increases Score Abbey power by 5000%",
        cost: 1.97e135
    },

    /* =Score Monastery= */
    
    {
        id: 146,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 5 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Monastery 1",
        desc: "Increases Score Monastery power by 100%",
        cost: 8.89e6
    },
    {
        id: 147,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 25 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Monastery 2",
        desc: "Increases Score Monastery power by 100%",
        cost: 2.91e8
    },
    {
        id: 148,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 75 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 2; },
        name: "Score Monastery 3",
        desc: "Increases Score Monastery power by 100%",
        cost: 4.72e11
    },
    {
        id: 149,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 150 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 2; },
        name: "Score Monastery 4",
        desc: "Increases Score Monastery power by 100%",
        cost: 2.25e16
    },
    {
        id: 150,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 200 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 2; },
        name: "Score Monastery 5",
        desc: "Increases Score Monastery power by 100%",
        cost: 3.048e19
    },
    {
        id: 151,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 300 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 3; },
        name: "Score Monastery 6",
        desc: "Increases Score Monastery power by 200%",
        cost: 4.295e25
    },
    {
        id: 152,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 400 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 3; },
        name: "Score Monastery 7",
        desc: "Increases Score Monastery power by 200%",
        cost: 5.854e31
    },
    {
        id: 153,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 3; },
        name: "Score Monastery 8",
        desc: "Increases Score Monastery power by 200%",
        cost: 7.896e37
    },
    {
        id: 154,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 600 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 3; },
        name: "Score Monastery 9",
        desc: "Increases Score Monastery power by 200%",
        cost: 1.043e44
    },
    {
        id: 155,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 700 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 3; },
        name: "Score Monastery 10",
        desc: "Increases Score Monastery power by 200%",
        cost: 1.361e50
    },
    {
        id: 156,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 800 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 4; },
        name: "Score Monastery 11",
        desc: "Increases Score Monastery power by 300%",
        cost: 1.758e56
    },
    {
        id: 157,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 900 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 4; },
        name: "Score Monastery 12",
        desc: "Increases Score Monastery power by 300%",
        cost: 2.252e62
    },
    {
        id: 158,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 1000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 4; },
        name: "Score Monastery 13",
        desc: "Increases Score Monastery power by 300%",
        cost: 2.866e68
    },
    {
        id: 159,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 1100 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 4; },
        name: "Score Monastery 14",
        desc: "Increases Score Monastery power by 300%",
        cost: 3.624e74
    },
    {
        id: 160,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 1250 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 4; },
        name: "Score Monastery 15",
        desc: "Increases Score Monastery power by 300%",
        cost: 4.941e83
    },
    {
        id: 161,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 1500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 5; },
        name: "Score Monastery 16",
        desc: "Increases Score Monastery power by 400%",
        cost: 7.876e98
    },
    {
        id: 162,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 1750 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 5; },
        name: "Score Monastery 17",
        desc: "Increases Score Monastery power by 400%",
        cost: 1.251e114
    },
    {
        id: 163,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 2000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 5; },
        name: "Score Monastery 18",
        desc: "Increases Score Monastery power by 400%",
        cost: 1.979e129
    },
    {
        id: 164,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 2500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 5; },
        name: "Score Monastery 19",
        desc: "Increases Score Monastery power by 400%",
        cost: 4.664e159
    },
    {
        id: 165,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 3500 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 51; },
        name: "Score Monastery 20",
        desc: "Increases Score Monastery power by 5000%",
        cost: 7.529e52
    },
    {
        id: 166,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 4000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 51; },
        name: "Score Monastery 21",
        desc: "Increases Score Monastery power by 5000%",
        cost: 2.073e59
    },
    {
        id: 167,
        cond: () => blob.buildings[glob.buildings.scoreMonastery.id] >= 10000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreMonastery.modifier *= 51; },
        name: "Score Monastery 22",
        desc: "Increases Score Monastery power by 5000%",
        cost: 2.291e139
    },

    /* =Score Cathedral= */
    
    {
        id: 168,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 5 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Cathedral 1",
        desc: "Increases Score Cathedral power by 100%",
        cost: 1.468e8
    },
    {
        id: 169,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 25 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Cathedral 2",
        desc: "Increases Score Cathedral power by 100%",
        cost: 4.806e9
    },
    {
        id: 170,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 75 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 2; },
        name: "Score Cathedral 3",
        desc: "Increases Score Cathedral power by 100%",
        cost: 7.812e12
    },
    {
        id: 171,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 150 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 2; },
        name: "Score Cathedral 4",
        desc: "Increases Score Cathedral power by 100%",
        cost: 3.716e17
    },
    {
        id: 172,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 200 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 2; },
        name: "Score Cathedral 5",
        desc: "Increases Score Cathedral power by 100%",
        cost: 5.033e20
    },
    {
        id: 173,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 300 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 3; },
        name: "Score Cathedral 6",
        desc: "Increases Score Cathedral power by 200%",
        cost: 7.093e26
    },
    {
        id: 174,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 400 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 3; },
        name: "Score Cathedral 7",
        desc: "Increases Score Cathedral power by 200%",
        cost: 9.718e32
    },
    {
        id: 175,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 3; },
        name: "Score Cathedral 8",
        desc: "Increases Score Cathedral power by 200%",
        cost: 1.304e39
    },
    {
        id: 176,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 600 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 3; },
        name: "Score Cathedral 9",
        desc: "Increases Score Cathedral power by 200%",
        cost: 1.723e45
    },
    {
        id: 177,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 700 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 3; },
        name: "Score Cathedral 10",
        desc: "Increases Score Cathedral power by 200%",
        cost: 2.248e51
    },
    {
        id: 178,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 800 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 4; },
        name: "Score Cathedral 11",
        desc: "Increases Score Cathedral power by 300%",
        cost: 2.904e57
    },
    {
        id: 179,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 900 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 4; },
        name: "Score Cathedral 12",
        desc: "Increases Score Cathedral power by 300%",
        cost: 3.72e63
    },
    {
        id: 180,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 1000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 4; },
        name: "Score Cathedral 13",
        desc: "Increases Score Cathedral power by 300%",
        cost: 4.733e69
    },
    {
        id: 181,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 1100 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 4; },
        name: "Score Cathedral 14",
        desc: "Increases Score Cathedral power by 300%",
        cost: 5.985e75
    },
    {
        id: 182,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 1250 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 4; },
        name: "Score Cathedral 15",
        desc: "Increases Score Cathedral power by 300%",
        cost: 8.16e84
    },
    {
        id: 183,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 1500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 5; },
        name: "Score Cathedral 16",
        desc: "Increases Score Cathedral power by 400%",
        cost: 1.301e100
    },
    {
        id: 184,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 1750 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 5; },
        name: "Score Cathedral 17",
        desc: "Increases Score Cathedral power by 400%",
        cost: 2.065e115
    },
    {
        id: 185,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 2000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 5; },
        name: "Score Cathedral 18",
        desc: "Increases Score Cathedral power by 400%",
        cost: 3.268e130
    },
    {
        id: 186,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 2500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 5; },
        name: "Score Cathedral 19",
        desc: "Increases Score Cathedral power by 400%",
        cost: 7.703e160
    },
    {
        id: 187,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 3500 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 51; },
        name: "Score Cathedral 20",
        desc: "Increases Score Cathedral power by 5000%",
        cost: 1.243e54
    },
    {
        id: 188,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 4000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 51; },
        name: "Score Cathedral 21",
        desc: "Increases Score Cathedral power by 5000%",
        cost: 3.423e60
    },
    {
        id: 189,
        cond: () => blob.buildings[glob.buildings.scoreCathedral.id] >= 10000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreCathedral.modifier *= 51; },
        name: "Score Cathedral 22",
        desc: "Increases Score Cathedral power by 5000%",
        cost: 3.784e137
    },

    /* =Score Parthenon= */
    
    {
        id: 190,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 5 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Parthenon 1",
        desc: "Increases Score Parthenon power by 100%",
        cost: 2.916e9
    },
    {
        id: 191,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 25 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Parthenon 2",
        desc: "Increases Score Parthenon power by 100%",
        cost: 9.546e10
    },
    {
        id: 192,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 75 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 2; },
        name: "Score Parthenon 3",
        desc: "Increases Score Parthenon power by 100%",
        cost: 1.552e14
    },
    {
        id: 193,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 150 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 2; },
        name: "Score Parthenon 4",
        desc: "Increases Score Parthenon power by 100%",
        cost: 7.381e18
    },
    {
        id: 194,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 200 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 2; },
        name: "Score Parthenon 5",
        desc: "Increases Score Parthenon power by 100%",
        cost: 9.998e21
    },
    {
        id: 195,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 300 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 3; },
        name: "Score Parthenon 6",
        desc: "Increases Score Parthenon power by 200%",
        cost: 1.409e28
    },
    {
        id: 196,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 400 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 3; },
        name: "Score Parthenon 7",
        desc: "Increases Score Parthenon power by 200%",
        cost: 1.93e34
    },
    {
        id: 197,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 3; },
        name: "Score Parthenon 8",
        desc: "Increases Score Parthenon power by 200%",
        cost: 2.59e40
    },
    {
        id: 198,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 600 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 3; },
        name: "Score Parthenon 9",
        desc: "Increases Score Parthenon power by 200%",
        cost: 3.422e46
    },
    {
        id: 199,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 700 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 3; },
        name: "Score Parthenon 10",
        desc: "Increases Score Parthenon power by 200%",
        cost: 4.465e52
    },
    {
        id: 200,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 800 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 4; },
        name: "Score Parthenon 11",
        desc: "Increases Score Parthenon power by 300%",
        cost: 5.768e58
    },
    {
        id: 201,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 900 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 4; },
        name: "Score Parthenon 12",
        desc: "Increases Score Parthenon power by 300%",
        cost: 7.389e64
    },
    {
        id: 202,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 1000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 4; },
        name: "Score Parthenon 13",
        desc: "Increases Score Parthenon power by 300%",
        cost: 9.401e70
    },
    {
        id: 203,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 1100 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 4; },
        name: "Score Parthenon 14",
        desc: "Increases Score Parthenon power by 300%",
        cost: 1.189e77
    },
    {
        id: 204,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 1250 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 4; },
        name: "Score Parthenon 15",
        desc: "Increases Score Parthenon power by 300%",
        cost: 1.621e86
    },
    {
        id: 205,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 1500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 5; },
        name: "Score Parthenon 16",
        desc: "Increases Score Parthenon power by 400%",
        cost: 2.584e101
    },
    {
        id: 206,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 1750 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 5; },
        name: "Score Parthenon 17",
        desc: "Increases Score Parthenon power by 400%",
        cost: 4.102e116
    },
    {
        id: 207,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 2000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 5; },
        name: "Score Parthenon 18",
        desc: "Increases Score Parthenon power by 400%",
        cost: 6.491e131
    },
    {
        id: 208,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 2500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 5; },
        name: "Score Parthenon 19",
        desc: "Increases Score Parthenon power by 400%",
        cost: 1.53e162
    },
    {
        id: 209,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 3500 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 51; },
        name: "Score Parthenon 20",
        desc: "Increases Score Parthenon power by 5000%",
        cost: 2.47e55
    },
    {
        id: 210,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 4000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 51; },
        name: "Score Parthenon 21",
        desc: "Increases Score Parthenon power by 5000%",
        cost: 6.8e61
    },
    {
        id: 211,
        cond: () => blob.buildings[glob.buildings.scoreParthenon.id] >= 10000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreParthenon.modifier *= 51; },
        name: "Score Parthenon 22",
        desc: "Increases Score Parthenon power by 5000%",
        cost: 7.517e138
    },

    /* =Score Vatican= */
    
    {
        id: 212,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 5 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Vatican 1",
        desc: "Increases Score Vatican power by 100%",
        cost: 6.436e10
    },
    {
        id: 213,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 25 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Vatican 2",
        desc: "Increases Score Vatican power by 100%",
        cost: 2.107e12
    },
    {
        id: 214,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 75 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 2; },
        name: "Score Vatican 3",
        desc: "Increases Score Vatican power by 100%",
        cost: 3.425e15
    },
    {
        id: 215,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 150 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 2; },
        name: "Score Vatican 4",
        desc: "Increases Score Vatican power by 100%",
        cost: 1.629e20
    },
    {
        id: 216,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 200 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 2; },
        name: "Score Vatican 5",
        desc: "Increases Score Vatican power by 100%",
        cost: 2.206e23
    },
    {
        id: 217,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 300 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 3; },
        name: "Score Vatican 6",
        desc: "Increases Score Vatican power by 200%",
        cost: 3.109e29
    },
    {
        id: 218,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 400 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 3; },
        name: "Score Vatican 7",
        desc: "Increases Score Vatican power by 200%",
        cost: 4.26e35
    },
    {
        id: 219,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 3; },
        name: "Score Vatican 8",
        desc: "Increases Score Vatican power by 200%",
        cost: 5.717e41
    },
    {
        id: 220,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 600 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 3; },
        name: "Score Vatican 9",
        desc: "Increases Score Vatican power by 200%",
        cost: 7.553e47
    },
    {
        id: 221,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 700 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 3; },
        name: "Score Vatican 10",
        desc: "Increases Score Vatican power by 200%",
        cost: 9.855e53
    },
    {
        id: 222,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 800 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 4; },
        name: "Score Vatican 11",
        desc: "Increases Score Vatican power by 300%",
        cost: 1.273e60
    },
    {
        id: 223,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 900 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 4; },
        name: "Score Vatican 12",
        desc: "Increases Score Vatican power by 300%",
        cost: 1.631e66
    },
    {
        id: 224,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 1000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 4; },
        name: "Score Vatican 13",
        desc: "Increases Score Vatican power by 300%",
        cost: 2.075e72
    },
    {
        id: 225,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 1100 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 4; },
        name: "Score Vatican 14",
        desc: "Increases Score Vatican power by 300%",
        cost: 2.624e78
    },
    {
        id: 226,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 1250 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 4; },
        name: "Score Vatican 15",
        desc: "Increases Score Vatican power by 300%",
        cost: 3.577e87
    },
    {
        id: 227,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 1500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 5; },
        name: "Score Vatican 16",
        desc: "Increases Score Vatican power by 400%",
        cost: 5.702e102
    },
    {
        id: 228,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 1750 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 5; },
        name: "Score Vatican 17",
        desc: "Increases Score Vatican power by 400%",
        cost: 9.054e117
    },
    {
        id: 229,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 2000 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 5; },
        name: "Score Vatican 18",
        desc: "Increases Score Vatican power by 400%",
        cost: 1.433e133
    },
    {
        id: 230,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 2500 && glob.factionID === 0,
        pred: () => { glob.buildings.scoreVatican.modifier *= 5; },
        name: "Score Vatican 19",
        desc: "Increases Score Vatican power by 400%",
        cost: 3.377e163
    },
    {
        id: 231,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 3500 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreVatican.modifier *= 51; },
        name: "Score Vatican 20",
        desc: "Increases Score Vatican power by 5000%",
        cost: 5.451e56
    },
    {
        id: 232,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 4000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreVatican.modifier *= 51; },
        name: "Score Vatican 21",
        desc: "Increases Score Vatican power by 5000%",
        cost: 1.501e63
    },
    {
        id: 233,
        cond: () => blob.buildings[glob.buildings.scoreVatican.id] >= 10000 && glob.factionID === 0 && false,
        pred: () => { glob.buildings.scoreVatican.modifier *= 51; },
        name: "Score Vatican 22",
        desc: "Increases Score Vatican power by 5000%",
        cost: 1.659e140
    },

    /* =Score Mine= */
    
    {
        id: 234,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 5 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Mine 1",
        desc: "Increases Score Mine power by 100%",
        cost: 36200
    },
    {
        id: 235,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 25 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Mine 2",
        desc: "Increases Score Mine power by 100%",
        cost: 1.185e6
    },
    {
        id: 236,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 75 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 2; },
        name: "Score Mine 3",
        desc: "Increases Score Mine power by 100%",
        cost: 1.926e9
    },
    {
        id: 237,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 150 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 2; },
        name: "Score Mine 4",
        desc: "Increases Score Mine power by 100%",
        cost: 9.162e13
    },
    {
        id: 238,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 200 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 2; },
        name: "Score Mine 5",
        desc: "Increases Score Mine power by 100%",
        cost: 1.241e17
    },
    {
        id: 239,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 300 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 3; },
        name: "Score Mine 6",
        desc: "Increases Score Mine power by 200%",
        cost: 1.749e23
    },
    {
        id: 240,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 400 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 3; },
        name: "Score Mine 7",
        desc: "Increases Score Mine power by 200%",
        cost: 2.396e29
    },
    {
        id: 241,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 3; },
        name: "Score Mine 8",
        desc: "Increases Score Mine power by 200%",
        cost: 3.216e35
    },
    {
        id: 242,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 600 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 3; },
        name: "Score Mine 9",
        desc: "Increases Score Mine power by 200%",
        cost: 4.248e41
    },
    {
        id: 243,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 700 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 3; },
        name: "Score Mine 10",
        desc: "Increases Score Mine power by 200%",
        cost: 5.543e47
    },
    {
        id: 244,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 800 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 4; },
        name: "Score Mine 11",
        desc: "Increases Score Mine power by 300%",
        cost: 7.16e53
    },
    {
        id: 245,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 900 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 4; },
        name: "Score Mine 12",
        desc: "Increases Score Mine power by 300%",
        cost: 9.173e59
    },
    {
        id: 246,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 1000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 4; },
        name: "Score Mine 13",
        desc: "Increases Score Mine power by 300%",
        cost: 1.167e66
    },
    {
        id: 247,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 1100 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 4; },
        name: "Score Mine 14",
        desc: "Increases Score Mine power by 300%",
        cost: 1.476e72
    },
    {
        id: 248,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 1250 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 4; },
        name: "Score Mine 15",
        desc: "Increases Score Mine power by 300%",
        cost: 2.012e81
    },
    {
        id: 249,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 1500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 5; },
        name: "Score Mine 16",
        desc: "Increases Score Mine power by 400%",
        cost: 3.207e96
    },
    {
        id: 250,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 1750 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 5; },
        name: "Score Mine 17",
        desc: "Increases Score Mine power by 400%",
        cost: 5.093e111
    },
    {
        id: 251,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 2000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 5; },
        name: "Score Mine 18",
        desc: "Increases Score Mine power by 400%",
        cost: 8.058e126
    },
    {
        id: 252,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 2500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMine.modifier *= 5; },
        name: "Score Mine 19",
        desc: "Increases Score Mine power by 400%",
        cost: 1.899e157
    },
    {
        id: 253,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 3500 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreMine.modifier *= 51; },
        name: "Score Mine 20",
        desc: "Increases Score Mine power by 5000%",
        cost: 3.066e50
    },
    {
        id: 254,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 4000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreMine.modifier *= 51; },
        name: "Score Mine 21",
        desc: "Increases Score Mine power by 5000%",
        cost: 8.441e56
    },
    {
        id: 255,
        cond: () => blob.buildings[glob.buildings.scoreMine.id] >= 10000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreMine.modifier *= 51; },
        name: "Score Mine 22",
        desc: "Increases Score Mine power by 5000%",
        cost: 9.331e133
    },

    /* =Score Drill= */
    
    {
        id: 256,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 5 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Drill 1",
        desc: "Increases Score Drill power by 100%",
        cost: 112640
    },
    {
        id: 257,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 25 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Drill 2",
        desc: "Increases Score Drill power by 100%",
        cost: 3.687e6
    },
    {
        id: 258,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 75 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 2; },
        name: "Score Drill 3",
        desc: "Increases Score Drill power by 100%",
        cost: 5.993e9
    },
    {
        id: 259,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 150 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 2; },
        name: "Score Drill 4",
        desc: "Increases Score Drill power by 100%",
        cost: 2.851e14
    },
    {
        id: 260,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 200 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 2; },
        name: "Score Drill 5",
        desc: "Increases Score Drill power by 100%",
        cost: 3.861e17
    },
    {
        id: 261,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 300 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 3; },
        name: "Score Drill 6",
        desc: "Increases Score Drill power by 200%",
        cost: 5.441e23
    },
    {
        id: 262,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 400 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 3; },
        name: "Score Drill 7",
        desc: "Increases Score Drill power by 200%",
        cost: 7.455e29
    },
    {
        id: 263,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 3; },
        name: "Score Drill 8",
        desc: "Increases Score Drill power by 200%",
        cost: 1e36
    },
    {
        id: 264,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 600 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 3; },
        name: "Score Drill 9",
        desc: "Increases Score Drill power by 200%",
        cost: 1.322e42
    },
    {
        id: 265,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 700 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 3; },
        name: "Score Drill 10",
        desc: "Increases Score Drill power by 200%",
        cost: 1.725e48
    },
    {
        id: 266,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 800 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 4; },
        name: "Score Drill 11",
        desc: "Increases Score Drill power by 300%",
        cost: 2.228e54
    },
    {
        id: 267,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 900 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 4; },
        name: "Score Drill 12",
        desc: "Increases Score Drill power by 300%",
        cost: 2.854e60
    },
    {
        id: 268,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 1000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 4; },
        name: "Score Drill 13",
        desc: "Increases Score Drill power by 300%",
        cost: 3.631e66
    },
    {
        id: 269,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 1100 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 4; },
        name: "Score Drill 14",
        desc: "Increases Score Drill power by 300%",
        cost: 4.591e72
    },
    {
        id: 270,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 1250 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 4; },
        name: "Score Drill 15",
        desc: "Increases Score Drill power by 300%",
        cost: 6.26e81
    },
    {
        id: 271,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 1500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 5; },
        name: "Score Drill 16",
        desc: "Increases Score Drill power by 400%",
        cost: 9.979e96
    },
    {
        id: 272,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 1750 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 5; },
        name: "Score Drill 17",
        desc: "Increases Score Drill power by 400%",
        cost: 1.584e112
    },
    {
        id: 273,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 2000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 5; },
        name: "Score Drill 18",
        desc: "Increases Score Drill power by 400%",
        cost: 2.507e127
    },
    {
        id: 274,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 2500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreDrill.modifier *= 5; },
        name: "Score Drill 19",
        desc: "Increases Score Drill power by 400%",
        cost: 5.909e157
    },
    {
        id: 275,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 3500 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreDrill.modifier *= 51; },
        name: "Score Drill 20",
        desc: "Increases Score Drill power by 5000%",
        cost: 9.539e50
    },
    {
        id: 276,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 4000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreDrill.modifier *= 51; },
        name: "Score Drill 21",
        desc: "Increases Score Drill power by 5000%",
        cost: 2.626e57
    },
    {
        id: 277,
        cond: () => blob.buildings[glob.buildings.scoreDrill.id] >= 10000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreDrill.modifier *= 51; },
        name: "Score Drill 22",
        desc: "Increases Score Drill power by 5000%",
        cost: 2.903e134
    },

    /* =Score Quarry= */
    
    {
        id: 278,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 5 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Quarry 1",
        desc: "Increases Score Quarry power by 100%",
        cost: 764320
    },
    {
        id: 279,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 25 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Quarry 2",
        desc: "Increases Score Quarry power by 100%",
        cost: 2.502e7
    },
    {
        id: 280,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 75 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 2; },
        name: "Score Quarry 3",
        desc: "Increases Score Quarry power by 100%",
        cost: 4.067e10
    },
    {
        id: 281,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 150 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 2; },
        name: "Score Quarry 4",
        desc: "Increases Score Quarry power by 100%",
        cost: 1.934e15
    },
    {
        id: 282,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 200 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 2; },
        name: "Score Quarry 5",
        desc: "Increases Score Quarry power by 100%",
        cost: 2.62e18
    },
    {
        id: 283,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 300 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 3; },
        name: "Score Quarry 6",
        desc: "Increases Score Quarry power by 200%",
        cost: 3.692e24
    },
    {
        id: 284,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 400 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 3; },
        name: "Score Quarry 7",
        desc: "Increases Score Quarry power by 200%",
        cost: 5.058e30
    },
    {
        id: 285,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 3; },
        name: "Score Quarry 8",
        desc: "Increases Score Quarry power by 200%",
        cost: 6.789e36
    },
    {
        id: 286,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 600 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 3; },
        name: "Score Quarry 9",
        desc: "Increases Score Quarry power by 200%",
        cost: 8.969e42
    },
    {
        id: 287,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 700 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 3; },
        name: "Score Quarry 10",
        desc: "Increases Score Quarry power by 200%",
        cost: 1.17e49
    },
    {
        id: 288,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 800 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 4; },
        name: "Score Quarry 11",
        desc: "Increases Score Quarry power by 300%",
        cost: 1.512e55
    },
    {
        id: 289,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 900 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 4; },
        name: "Score Quarry 12",
        desc: "Increases Score Quarry power by 300%",
        cost: 1.937e61
    },
    {
        id: 290,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 1000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 4; },
        name: "Score Quarry 13",
        desc: "Increases Score Quarry power by 300%",
        cost: 2.464e67
    },
    {
        id: 291,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 1100 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 4; },
        name: "Score Quarry 14",
        desc: "Increases Score Quarry power by 300%",
        cost: 3.116e73
    },
    {
        id: 292,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 1250 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 4; },
        name: "Score Quarry 15",
        desc: "Increases Score Quarry power by 300%",
        cost: 4.248e82
    },
    {
        id: 293,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 1500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 5; },
        name: "Score Quarry 16",
        desc: "Increases Score Quarry power by 400%",
        cost: 6.771e97
    },
    {
        id: 294,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 1750 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 5; },
        name: "Score Quarry 17",
        desc: "Increases Score Quarry power by 400%",
        cost: 1.075e113
    },
    {
        id: 295,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 2000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 5; },
        name: "Score Quarry 18",
        desc: "Increases Score Quarry power by 400%",
        cost: 1.701e128
    },
    {
        id: 296,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 2500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 5; },
        name: "Score Quarry 19",
        desc: "Increases Score Quarry power by 400%",
        cost: 4.01e158
    },
    {
        id: 297,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 3500 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 51; },
        name: "Score Quarry 20",
        desc: "Increases Score Quarry power by 5000%",
        cost: 6.473e51
    },
    {
        id: 298,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 4000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 51; },
        name: "Score Quarry 21",
        desc: "Increases Score Quarry power by 5000%",
        cost: 1.782e58
    },
    {
        id: 299,
        cond: () => blob.buildings[glob.buildings.scoreQuarry.id] >= 10000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreQuarry.modifier *= 51; },
        name: "Score Quarry 22",
        desc: "Increases Score Quarry power by 5000%",
        cost: 1.97e135
    },

    /* =Score Rig= */
    
    {
        id: 300,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 5 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Rig 1",
        desc: "Increases Score Rig power by 100%",
        cost: 8.89e6
    },
    {
        id: 301,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 25 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Rig 2",
        desc: "Increases Score Rig power by 100%",
        cost: 2.91e8
    },
    {
        id: 302,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 75 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 2; },
        name: "Score Rig 3",
        desc: "Increases Score Rig power by 100%",
        cost: 4.72e11
    },
    {
        id: 303,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 150 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 2; },
        name: "Score Rig 4",
        desc: "Increases Score Rig power by 100%",
        cost: 2.25e16
    },
    {
        id: 304,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 200 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 2; },
        name: "Score Rig 5",
        desc: "Increases Score Rig power by 100%",
        cost: 3.048e19
    },
    {
        id: 305,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 300 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 3; },
        name: "Score Rig 6",
        desc: "Increases Score Rig power by 200%",
        cost: 4.295e25
    },
    {
        id: 306,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 400 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 3; },
        name: "Score Rig 7",
        desc: "Increases Score Rig power by 200%",
        cost: 5.854e31
    },
    {
        id: 307,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 3; },
        name: "Score Rig 8",
        desc: "Increases Score Rig power by 200%",
        cost: 7.896e37
    },
    {
        id: 308,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 600 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 3; },
        name: "Score Rig 9",
        desc: "Increases Score Rig power by 200%",
        cost: 1.043e44
    },
    {
        id: 309,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 700 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 3; },
        name: "Score Rig 10",
        desc: "Increases Score Rig power by 200%",
        cost: 1.361e50
    },
    {
        id: 310,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 800 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 4; },
        name: "Score Rig 11",
        desc: "Increases Score Rig power by 300%",
        cost: 1.758e56
    },
    {
        id: 311,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 900 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 4; },
        name: "Score Rig 12",
        desc: "Increases Score Rig power by 300%",
        cost: 2.252e62
    },
    {
        id: 312,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 1000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 4; },
        name: "Score Rig 13",
        desc: "Increases Score Rig power by 300%",
        cost: 2.866e68
    },
    {
        id: 313,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 1100 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 4; },
        name: "Score Rig 14",
        desc: "Increases Score Rig power by 300%",
        cost: 3.624e74
    },
    {
        id: 314,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 1250 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 4; },
        name: "Score Rig 15",
        desc: "Increases Score Rig power by 300%",
        cost: 4.941e83
    },
    {
        id: 315,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 1500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 5; },
        name: "Score Rig 16",
        desc: "Increases Score Rig power by 400%",
        cost: 7.876e98
    },
    {
        id: 316,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 1750 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 5; },
        name: "Score Rig 17",
        desc: "Increases Score Rig power by 400%",
        cost: 1.251e114
    },
    {
        id: 317,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 2000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 5; },
        name: "Score Rig 18",
        desc: "Increases Score Rig power by 400%",
        cost: 1.979e129
    },
    {
        id: 318,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 2500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreRig.modifier *= 5; },
        name: "Score Rig 19",
        desc: "Increases Score Rig power by 400%",
        cost: 4.664e159
    },
    {
        id: 319,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 3500 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreRig.modifier *= 51; },
        name: "Score Rig 20",
        desc: "Increases Score Rig power by 5000%",
        cost: 7.529e52
    },
    {
        id: 320,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 4000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreRig.modifier *= 51; },
        name: "Score Rig 21",
        desc: "Increases Score Rig power by 5000%",
        cost: 2.073e59
    },
    {
        id: 321,
        cond: () => blob.buildings[glob.buildings.scoreRig.id] >= 10000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreRig.modifier *= 51; },
        name: "Score Rig 22",
        desc: "Increases Score Rig power by 5000%",
        cost: 2.291e139
    },

    /* =Score Foundry= */
    
    {
        id: 322,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 5 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Foundry 1",
        desc: "Increases Score Foundry power by 100%",
        cost: 1.468e8
    },
    {
        id: 323,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 25 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Foundry 2",
        desc: "Increases Score Foundry power by 100%",
        cost: 4.806e9
    },
    {
        id: 324,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 75 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 2; },
        name: "Score Foundry 3",
        desc: "Increases Score Foundry power by 100%",
        cost: 7.812e12
    },
    {
        id: 325,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 150 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 2; },
        name: "Score Foundry 4",
        desc: "Increases Score Foundry power by 100%",
        cost: 3.716e17
    },
    {
        id: 326,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 200 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 2; },
        name: "Score Foundry 5",
        desc: "Increases Score Foundry power by 100%",
        cost: 5.033e20
    },
    {
        id: 327,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 300 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 3; },
        name: "Score Foundry 6",
        desc: "Increases Score Foundry power by 200%",
        cost: 7.093e26
    },
    {
        id: 328,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 400 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 3; },
        name: "Score Foundry 7",
        desc: "Increases Score Foundry power by 200%",
        cost: 9.718e32
    },
    {
        id: 329,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 3; },
        name: "Score Foundry 8",
        desc: "Increases Score Foundry power by 200%",
        cost: 1.304e39
    },
    {
        id: 330,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 600 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 3; },
        name: "Score Foundry 9",
        desc: "Increases Score Foundry power by 200%",
        cost: 1.723e45
    },
    {
        id: 331,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 700 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 3; },
        name: "Score Foundry 10",
        desc: "Increases Score Foundry power by 200%",
        cost: 2.248e51
    },
    {
        id: 332,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 800 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 4; },
        name: "Score Foundry 11",
        desc: "Increases Score Foundry power by 300%",
        cost: 2.904e57
    },
    {
        id: 333,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 900 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 4; },
        name: "Score Foundry 12",
        desc: "Increases Score Foundry power by 300%",
        cost: 3.72e63
    },
    {
        id: 334,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 1000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 4; },
        name: "Score Foundry 13",
        desc: "Increases Score Foundry power by 300%",
        cost: 4.733e69
    },
    {
        id: 335,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 1100 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 4; },
        name: "Score Foundry 14",
        desc: "Increases Score Foundry power by 300%",
        cost: 5.985e75
    },
    {
        id: 336,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 1250 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 4; },
        name: "Score Foundry 15",
        desc: "Increases Score Foundry power by 300%",
        cost: 8.16e84
    },
    {
        id: 337,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 1500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 5; },
        name: "Score Foundry 16",
        desc: "Increases Score Foundry power by 400%",
        cost: 1.301e100
    },
    {
        id: 338,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 1750 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 5; },
        name: "Score Foundry 17",
        desc: "Increases Score Foundry power by 400%",
        cost: 2.065e115
    },
    {
        id: 339,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 2000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 5; },
        name: "Score Foundry 18",
        desc: "Increases Score Foundry power by 400%",
        cost: 3.268e130
    },
    {
        id: 340,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 2500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 5; },
        name: "Score Foundry 19",
        desc: "Increases Score Foundry power by 400%",
        cost: 7.703e160
    },
    {
        id: 341,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 3500 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 51; },
        name: "Score Foundry 20",
        desc: "Increases Score Foundry power by 5000%",
        cost: 1.243e54
    },
    {
        id: 342,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 4000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 51; },
        name: "Score Foundry 21",
        desc: "Increases Score Foundry power by 5000%",
        cost: 3.423e60
    },
    {
        id: 343,
        cond: () => blob.buildings[glob.buildings.scoreFoundry.id] >= 10000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreFoundry.modifier *= 51; },
        name: "Score Foundry 22",
        desc: "Increases Score Foundry power by 5000%",
        cost: 3.784e137
    },

    /* =Score Factory= */
    
    {
        id: 344,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 5 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Factory 1",
        desc: "Increases Score Factory power by 100%",
        cost: 2.916e9
    },
    {
        id: 345,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 25 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Factory 2",
        desc: "Increases Score Factory power by 100%",
        cost: 9.546e10
    },
    {
        id: 346,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 75 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 2; },
        name: "Score Factory 3",
        desc: "Increases Score Factory power by 100%",
        cost: 1.552e14
    },
    {
        id: 347,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 150 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 2; },
        name: "Score Factory 4",
        desc: "Increases Score Factory power by 100%",
        cost: 7.381e18
    },
    {
        id: 348,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 200 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 2; },
        name: "Score Factory 5",
        desc: "Increases Score Factory power by 100%",
        cost: 9.998e21
    },
    {
        id: 349,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 300 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 3; },
        name: "Score Factory 6",
        desc: "Increases Score Factory power by 200%",
        cost: 1.409e28
    },
    {
        id: 350,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 400 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 3; },
        name: "Score Factory 7",
        desc: "Increases Score Factory power by 200%",
        cost: 1.93e34
    },
    {
        id: 351,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 3; },
        name: "Score Factory 8",
        desc: "Increases Score Factory power by 200%",
        cost: 2.59e40
    },
    {
        id: 352,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 600 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 3; },
        name: "Score Factory 9",
        desc: "Increases Score Factory power by 200%",
        cost: 3.422e46
    },
    {
        id: 353,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 700 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 3; },
        name: "Score Factory 10",
        desc: "Increases Score Factory power by 200%",
        cost: 4.465e52
    },
    {
        id: 354,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 800 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 4; },
        name: "Score Factory 11",
        desc: "Increases Score Factory power by 300%",
        cost: 5.768e58
    },
    {
        id: 355,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 900 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 4; },
        name: "Score Factory 12",
        desc: "Increases Score Factory power by 300%",
        cost: 7.389e64
    },
    {
        id: 356,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 1000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 4; },
        name: "Score Factory 13",
        desc: "Increases Score Factory power by 300%",
        cost: 9.401e70
    },
    {
        id: 357,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 1100 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 4; },
        name: "Score Factory 14",
        desc: "Increases Score Factory power by 300%",
        cost: 1.189e77
    },
    {
        id: 358,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 1250 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 4; },
        name: "Score Factory 15",
        desc: "Increases Score Factory power by 300%",
        cost: 1.621e86
    },
    {
        id: 359,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 1500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 5; },
        name: "Score Factory 16",
        desc: "Increases Score Factory power by 400%",
        cost: 2.584e101
    },
    {
        id: 360,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 1750 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 5; },
        name: "Score Factory 17",
        desc: "Increases Score Factory power by 400%",
        cost: 4.102e116
    },
    {
        id: 361,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 2000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 5; },
        name: "Score Factory 18",
        desc: "Increases Score Factory power by 400%",
        cost: 6.491e131
    },
    {
        id: 362,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 2500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreFactory.modifier *= 5; },
        name: "Score Factory 19",
        desc: "Increases Score Factory power by 400%",
        cost: 1.53e162
    },
    {
        id: 363,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 3500 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreFactory.modifier *= 51; },
        name: "Score Factory 20",
        desc: "Increases Score Factory power by 5000%",
        cost: 2.47e55
    },
    {
        id: 364,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 4000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreFactory.modifier *= 51; },
        name: "Score Factory 21",
        desc: "Increases Score Factory power by 5000%",
        cost: 6.8e61
    },
    {
        id: 365,
        cond: () => blob.buildings[glob.buildings.scoreFactory.id] >= 10000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreFactory.modifier *= 51; },
        name: "Score Factory 22",
        desc: "Increases Score Factory power by 5000%",
        cost: 7.517e138
    },
    
    /* =Score Megacorp= */
    
    {
        id: 366,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 5 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Megacorp 1",
        desc: "Increases Score Megacorp power by 100%",
        cost: 6.436e10
    },
    {
        id: 367,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 25 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 2; glob.autoclickers += 1; },
        name: "Score Megacorp 2",
        desc: "Increases Score Megacorp power by 100%",
        cost: 2.107e12
    },
    {
        id: 368,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 75 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 2; },
        name: "Score Megacorp 3",
        desc: "Increases Score Megacorp power by 100%",
        cost: 3.425e15
    },
    {
        id: 369,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 150 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 2; },
        name: "Score Megacorp 4",
        desc: "Increases Score Megacorp power by 100%",
        cost: 1.629e20
    },
    {
        id: 370,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 200 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 2; },
        name: "Score Megacorp 5",
        desc: "Increases Score Megacorp power by 100%",
        cost: 2.206e23
    },
    {
        id: 371,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 300 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 3; },
        name: "Score Megacorp 6",
        desc: "Increases Score Megacorp power by 200%",
        cost: 3.109e29
    },
    {
        id: 372,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 400 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 3; },
        name: "Score Megacorp 7",
        desc: "Increases Score Megacorp power by 200%",
        cost: 4.26e35
    },
    {
        id: 373,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 3; },
        name: "Score Megacorp 8",
        desc: "Increases Score Megacorp power by 200%",
        cost: 5.717e41
    },
    {
        id: 374,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 600 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 3; },
        name: "Score Megacorp 9",
        desc: "Increases Score Megacorp power by 200%",
        cost: 7.553e47
    },
    {
        id: 375,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 700 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 3; },
        name: "Score Megacorp 10",
        desc: "Increases Score Megacorp power by 200%",
        cost: 9.855e53
    },
    {
        id: 376,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 800 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 4; },
        name: "Score Megacorp 11",
        desc: "Increases Score Megacorp power by 300%",
        cost: 1.273e60
    },
    {
        id: 377,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 900 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 4; },
        name: "Score Megacorp 12",
        desc: "Increases Score Megacorp power by 300%",
        cost: 1.631e66
    },
    {
        id: 378,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 1000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 4; },
        name: "Score Megacorp 13",
        desc: "Increases Score Megacorp power by 300%",
        cost: 2.075e72
    },
    {
        id: 379,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 1100 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 4; },
        name: "Score Megacorp 14",
        desc: "Increases Score Megacorp power by 300%",
        cost: 2.624e78
    },
    {
        id: 380,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 1250 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 4; },
        name: "Score Megacorp 15",
        desc: "Increases Score Megacorp power by 300%",
        cost: 3.577e87
    },
    {
        id: 381,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 1500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 5; },
        name: "Score Megacorp 16",
        desc: "Increases Score Megacorp power by 400%",
        cost: 5.702e102
    },
    {
        id: 382,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 1750 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 5; },
        name: "Score Megacorp 17",
        desc: "Increases Score Megacorp power by 400%",
        cost: 9.054e117
    },
    {
        id: 383,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 2000 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 5; },
        name: "Score Megacorp 18",
        desc: "Increases Score Megacorp power by 400%",
        cost: 1.433e133
    },
    {
        id: 384,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 2500 && glob.factionID === 1,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 5; },
        name: "Score Megacorp 19",
        desc: "Increases Score Megacorp power by 400%",
        cost: 3.377e163
    },
    {
        id: 385,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 3500 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 51; },
        name: "Score Megacorp 20",
        desc: "Increases Score Megacorp power by 5000%",
        cost: 5.451e56
    },
    {
        id: 386,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 4000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 51; },
        name: "Score Megacorp 21",
        desc: "Increases Score Megacorp power by 5000%",
        cost: 1.501e63
    },
    {
        id: 387,
        cond: () => blob.buildings[glob.buildings.scoreMegacorp.id] >= 10000 && glob.factionID === 1 && false,
        pred: () => { glob.buildings.scoreMegacorp.modifier *= 51; },
        name: "Score Megacorp 22",
        desc: "Increases Score Megacorp power by 5000%",
        cost: 1.659e140
    },

    /* =Production as Click= */
    
    {
        id: 388,
        cond: () => blob.stats.scoreEarned >= 100000,
        pred: () => { glob.productionAsClick += 1; },
        name: "Fancy Button",
        desc: "Increases base click score by 1% of your Score per second",
        cost: 50000
    },
    {
        id: 389,
        cond: () => blob.stats.scoreEarned >= 1e8,
        pred: () => { glob.productionAsClick += 1; },
        name: "Ornate Button",
        desc: "Increases base click score by 1% of your Score per second",
        cost: 5e7
    },
    {
        id: 390,
        cond: () => blob.stats.scoreEarned >= 1e11,
        pred: () => { glob.productionAsClick += 1; },
        name: "Adorned Button",
        desc: "Increases base click score by 1% of your Score per second",
        cost: 5e10
    },
    {
        id: 391,
        cond: () => blob.stats.scoreEarned >= 1e14,
        pred: () => { glob.productionAsClick += 1; },
        name: "Embellished Button",
        desc: "Increases base click score by 1% of your Score per second",
        cost: 5e13
    },
    {
        id: 392,
        cond: () => blob.stats.scoreEarned >= 1e17,
        pred: () => { glob.productionAsClick += 1; },
        name: "Resplendent Button",
        desc: "Increases base click score by 1% of your Score per second",
        cost: 5e15
    },

    /* =Factions= */
    
    {
        id: 393,
        cond: () => glob.factionID === 0,
        pred: () => { setSubFaction(0); },
        name: "Traditionalist Teachings",
        desc: "Align your religion with the Traditionalists, focusing on the production of Wells, Printers, and Machines",
        cost: 20,
        coinType: 0
    },
    {
        id: 394,
        cond: () => glob.factionID === 0,
        pred: () => { setSubFaction(1); },
        name: "Orthodox Teachings",
        desc: "Align your religion with the Orthodox, focusing on clicking the button",
        cost: 20,
        coinType: 1
    },
    {
        id: 395,
        cond: () => glob.factionID === 0,
        pred: () => { setSubFaction(2); },
        name: "Cultist Teachings",
        desc: "Align your religion with the Cultists, focusing on Cheats",
        cost: 20,
        coinType: 2
    },
    {
        id: 396,
        cond: () => glob.factionID === 1,
        pred: () => { setSubFaction(0); },
        name: "Investor Contract",
        desc: "Strike a deal with Investors, focusing on increasing production over long periods of time",
        cost: 20,
        coinType: 3
    },
    {
        id: 397,
        cond: () => glob.factionID === 1,
        pred: () => { setSubFaction(1); },
        name: "Executive Contract",
        desc: "Strike a deal with Executives, focusing on cheaper buildings and fast score",
        cost: 20,
        coinType: 4
    },
    {
        id: 398,
        cond: () => glob.factionID === 1,
        pred: () => { setSubFaction(2); },
        name: "Startup Contract",
        desc: "Strike a deal with startups, focusing on increasing production of the most powerful buildings",
        cost: 20,
        coinType: 5
    },
    
    /* =Traditionalist= */
    
    {
        id: 399,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0,
        pred: () => { glob.buildings.scoreWell.score += 98; glob.buildings.scoreWell.costMult -= 0.035},
        name: "Traditionalist 1-1",
        desc: "Increase base production of Score Wells by 98 and reduce cost multiplier",
        cost: 5e7
    },
    {
        id: 400,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0,
        pred: () => { glob.buildings.scorePrinter.score += 234; glob.buildings.scorePrinter.costMult -= 0.03},
        name: "Traditionalist 1-2",
        desc: "Increase base production of Score Printers by 234 and reduce cost multiplier",
        cost: 5e8
    },
    {
        id: 401,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0,
        pred: () => { glob.buildings.scoreMachine.score += 580; glob.buildings.scoreMachine.costMult -= 0.025},
        name: "Traditionalist 1-3",
        desc: "Increase base production of Score Machines by 580 and reduce cost multiplier",
        cost: 5e9
    },
    {
        id: 402,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0,
        pred: () => { glob.subFactionTier++; },
        name: "Traditionalist Holy Book",
        desc: "Unlocks Traditionalist Upgrades",
        cost: 100,
        coinType: 0
    },
    {
        id: 403,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0 && glob.subFactionTier >= 2,
        pred: () => { glob.buildings.scoreWell.modifier *= 150; glob.buildings.scorePrinter.modifier *= 150; glob.buildings.scoreMachine.modifier *= 150; },
        name: "Traditionalist 2-1",
        desc: "Increase production of Score Wells, Printers, and Machines by 15000%",
        cost: 5e11
    },
    {
        id: 404,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0 && glob.subFactionTier >= 2,
        pred: () => { glob.updateList.push(() => {
                let build = glob.buildings.scoreWell;
                let count = blob.buildings[build.id];
                let wellFrac = build.score * count * build.modifier * glob.globalBuildingModifier;
                build = glob.buildings.scorePrinter;
                count = blob.buildings[build.id];
                let printerFrac = build.score * count * build.modifier * glob.globalBuildingModifier;
                build = glob.buildings.scoreMachine;
                count = blob.buildings[build.id];
                let machineFrac = build.score * count * build.modifier * glob.globalBuildingModifier;
                glob.clickBonus += (wellFrac + printerFrac + machineFrac) * 0.2;
            });
        },
        name: "Traditionalist 2-2",
        desc: "Increase clicking reward by 20% of the production of Wells, Printers, and Machines combined",
        cost: 5e12
    },
    {
        id: 405,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0 && glob.subFactionTier >= 2,
        pred: () => { glob.updateList.push(() => {
                glob.cheatPowerBonus += blob.buildings[glob.buildings.scoreMachine.id] ** 0.25;
            });
        },
        name: "Traditionalist 2-3",
        desc: "Machines also increase your cheat power regeneration rate",
        cost: 5e13
    },
    {
        id: 406,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0 && glob.subFactionTier === 2,
        pred: () => { glob.subFactionTier++; },
        name: "Traditionalist Enlightenment",
        desc: "Unlocks Traditionalist Upgrades",
        cost: 500,
        coinType: 0
    },
    {
        id: 407,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0 && glob.subFactionTier === 3,
        pred: () => { glob.tick.maxCheatPower += Math.floor((blob.buildings[glob.buildings.scoreChapel] + blob.buildings[glob.buildings.scoreChurch] + blob.buildings[glob.buildings.scoreAbbey] + blob.buildings[glob.buildings.scoreMonastery] + blob.buildings[glob.buildings.scoreCathedral] + blob.buildings[glob.buildings.scoreParthenon] + blob.buildings[glob.buildings.scoreVatican]) / 8) },
        name: "Traditionalist 3-1",
        desc: "Increases maximum mana by 1 for every 8 religious buildings you own.",
        cost: 5e15
    },
    {
        id: 408,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0 && glob.subFactionTier === 3,
        pred: () => { glob.updateList.push(() => {
                let buildingTotal = blob.buildings[glob.buildings.scoreWell.id].count + blob.buildings[glob.buildings.scorePrinter.id].count + blob.buildings[glob.buildings.scoreMachine.id].count;
                let bonus = buildingTotal * 3 / 1000;
                glob.tick.globalProductionModifier *= bonus;
            });
        },
        name: "Traditionalist 3-2",
        desc: "Increase the production of all buildings by 0.3% per Well, Printer, and Machine you own.",
        cost: 5e16
    },
    {
        id: 409,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0 && glob.subFactionTier === 3,
        pred: () => { glob.updateList.push(() => {
                let buildingTotal = blob.buildings[glob.buildings.scoreWell.id].count + blob.buildings[glob.buildings.scorePrinter.id].count + blob.buildings[glob.buildings.scoreMachine.id].count;
                glob.tick.autoclickerBonus += Math.sqrt(1 + 4 * builtingTotal) - 1 / 3;
            });
        },
        name: "Traditionalist 3-3",
        desc: "You gain additional autoclickers based on the amount of Wells, Printers, and Machines you own.",
        cost: 5e17
    },

    /* =Orthodox= */
    
    {
        id: 410,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1,
        pred: () => { glob.factionCoinChance *= 2; },
        name: "Orthodox 1-1",
        desc: "The base chance to earn Faction Favor is doubled",
        cost: 5e7
    },
    {
        id: 411,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1,
        pred: () => { glob.updateList.push(() => {
                if (blob.earnedTrophies === undefined) blob.earnedTrophies = [];

                let trophyCount = blob.earnedTrophies.length;
                glob.tick.clickBonus += trophyCount *= 2.5e8;

                let facCoinBonus = trophyCount * 0.05 + 1 ** 0.95;
            });
        },
        name: "Orthodox 1-2",
        desc: "Increase base clicking reward by 250k per trophy, and increase chance to earn Faction Favor based on the amount of trophies you unlocked.",
        cost: 5e8
    },
    {
        id: 412,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1,
        pred: () => { glob.productionAsClick += 80;},
        name: "Orthodox 1-3",
        desc: "Increase clicking reward by 80% of your total production.",
        cost: 5e9
    },
    {
        id: 413,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1,
        pred: () => { glob.subFactionTier++; },
        name: "Orthodox Holy Book",
        desc: "Unlocks Orthodox Upgrades",
        cost: 100,
        coinType: 1
    },
    {
        id: 414,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1 && glob.subFactionTier === 2,
        pred: () => {
            glob.acFactionCoinChance *= 3;
            glob.updateList.push(() => {
                let religiousBuildingCount = (blob.buildings[glob.buildings.scoreChapel] + blob.buildings[glob.buildings.scoreChurch] + blob.buildings[glob.buildings.scoreAbbey] + blob.buildings[glob.buildings.scoreMonastery] + blob.buildings[glob.buildings.scoreCathedral] + blob.buildings[glob.buildings.scoreParthenon] + blob.buildings[glob.buildings.scoreVatican]);
                glob.tick.clickModifier *= religiousBuildingCount ** 0.6 * 100;
            });
        },
        name: "Orthodox 2-1",
        desc: "Increase clicking reward based on the amount of Religious buildings you own, and assistants earn 3 times as much Faction Favor.",
        cost: 5e11
    },
    {
        id: 415,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1 && glob.subFactionTier === 2,
        pred: () => { },
        name: "Orthodox 2-2",
        desc: "Faction Embassies also increase clicking reward by 2% each",
        cost: 5e12
    },
    {
        id: 416,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1 && glob.subFactionTier === 2,
        pred: () => { glob.updateList.push(() => {
                glob.tick.globalProductionModifier
            });
        },
        name: "Orthodox 2-3",
        desc: "Increases the production of all buildings based on your total of clicks",
        cost: 5e13
    },
    {
        id: 417,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1 && glob.subFactionTier === 2,
        pred: () => { glob.subFactionTier++; },
        name: "Orthodox Enlightenment",
        desc: "Unlocks Orthodox Upgrades",
        cost: 500,
        coinType: 1
    },
    {
        id: 418,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1 && glob.subFactionTier === 3,
        pred: () => { glob.tick.maxCheatPower += (blob.buildings[glob.buildings.scoreChapel] + blob.buildings[glob.buildings.scoreChurch] + blob.buildings[glob.buildings.scoreAbbey] + blob.buildings[glob.buildings.scoreMonastery] + blob.buildings[glob.buildings.scoreCathedral] + blob.buildings[glob.buildings.scoreParthenon] + blob.buildings[glob.buildings.scoreVatican]) / 8 },
        name: "Orthodox 3-1",
        desc: "Increases maximum mana by 1 for every 8 religious buildings you own.",
        cost: 5e15
    },
    {
        id: 419,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1 && glob.subFactionTier === 3,
        pred: () => { glob.updateList.push(() => {
                let buildingTotal = blob.buildings[glob.buildings.scoreWell.id].count + blob.buildings[glob.buildings.scorePrinter.id].count + blob.buildings[glob.buildings.scoreMachine.id].count;
                let bonus = buildingTotal * 3 / 1000;
                glob.tick.globalProductionModifier *= bonus;
            });
        },
        name: "Orthodox 3-2",
        desc: "Increase the production of all buildings by 0.3% per Well, Printer, and Machine you own.",
        cost: 5e16
    },
    {
        id: 420,
        cond: () => glob.factionID === 0 && glob.subFactionID === 1 && glob.subFactionTier === 3,
        pred: () => { glob.updateList.push(() => {
                let buildingTotal = blob.buildings[glob.buildings.scoreWell.id].count + blob.buildings[glob.buildings.scorePrinter.id].count + blob.buildings[glob.buildings.scoreMachine.id].count;
                glob.tick.autoclickerBonus += Math.sqrt(1 + 4 * builtingTotal) - 1 / 3
            });
        },
        name: "Orthodox 3-3",
        desc: "You gain additional autoclickers based on the amount of Wells, Printers, and Machines you own.",
        cost: 5e17
    },
    
    /* =Cultist= */
    
    
    /* =Executive= */
    
    
    /* =Investor= */
    
    
    /* =Startup= */
    
    
    /* =Cheat Power= */
    
    {
        id: 465,
        cond: () => blob.stats.cheatPowerGained >= 2e5,
        pred: () => { glob.cheatPowerps += 500; },
        name: "Cheat Power 1",
        desc: "Increases Cheat Power regeneration by +0.50/s",
        cost: 10000
    },
    {
        id: 466,
        cond: () => blob.stats.cheatPowerGained >= 2e6,
        pred: () => { glob.cheatPowerps += 500; },
        name: "Cheat Power 2",
        desc: "Increases Cheat Power regeneration by +0.50/s",
        cost: 2e7
    },
    {
        id: 467,
        cond: () => blob.stats.cheatPowerGained >= 5e6,
        pred: () => { glob.cheatPowerps += 500; },
        name: "Cheat Power 3",
        desc: "Increases Cheat Power regeneration by +0.50/s",
        cost: 3e10
    },
    {
        id: 468,
        cond: () => blob.stats.cheatPowerGained >= 1e7,
        pred: () => { glob.cheatPowerps += 500; },
        name: "Cheat Power 4",
        desc: "Increases Cheat Power regeneration by +0.50/s",
        cost: 4e13
    },
    {
        id: 469,
        cond: () => blob.stats.cheatPowerGained >= 2e7,
        pred: () => { glob.cheatPowerps += 500; },
        name: "Cheat Power 5",
        desc: "Increases Cheat Power regeneration by +0.50/s",
        cost: 5e16
    },
    {
        id: 470,
        cond: () => blob.stats.cheatPowerGained >= 1e8,
        pred: () => { glob.cheatPowerps += 500; },
        name: "Cheat Power 6",
        desc: "Increases Cheat Power regeneration by +0.50/s",
        cost: 6e19
    },
    {
        id: 471,
        cond: () => blob.stats.cheatPowerGained >= 2e8,
        pred: () => { glob.cheatPowerps += 500; },
        name: "Cheat Power 7",
        desc: "Increases Cheat Power regeneration by +0.50/s",
        cost: 7e22
    },
];

var cheatData = [
    {
        id: 1,
        cond: () => true,
        pred: () => { blob.score += glob.sps * 30000; },
        name: "Speed Glitch",
        desc: "Instantly gain 30 seconds of production",
        cost: 200000
    },
    {
        id: 2,
        cond: () => true,
        pred: () => {
            createEffect(0)
        },
        name: "Pay To Win",
        desc: "Increase production of all buildings based on the number of buildings currently owned for 20 seconds",
        cost: 400000
    },
    {
        id: 3,
        cond: () => glob.factionID === 0,
        pred: () => {
            createEffect(1)
        },
        name: "Pray",
        desc: "Increases clicking power by 1,750%",
        cost: 900000
    },
    {
        id: 4,
        cond: () => glob.factionID === 0 && glob.subFactionID === 0,
        pred: () => {
            createEffect(2)
        },
        name: "Mass",
        desc: "Increase the production of Wells, Printers and Machines by 50,000%",
        cost: 1000000
    }
];

var effectData = [
    {
        name: "Pay To Win",
        duration: 20,
        onEffect: () => { 
            let buildingCount = blob.buildings.reduce((a, b) => a + b);
            blob.ptwBonus = 100 + (buildingCount * 3 / 10);
            glob.globalBuildingModifier *= blob.ptwBonus;
            glob.globalBuildingModifier /= 100;
        },
        offEffect: () => {
            glob.globalBuildingModifier /= blob.ptwBonus;
            glob.globalBuildingModifier *= 100;
        },
    },
    {
        name: "Pray",
        duration: 10,
        onEffect: () => {
            glob.clickModifier = glob.clickModifier * 35 / 2;
        },
        offEffect: () => {
            glob.clickModifier = glob.clickModifier * 2 / 35;
        }
    },
    {
        name: "Mass",
        duration: 10,
        onEffect: () => {
            glob.buildings.scoreWell.modifier *= 500;
            glob.buildings.scorePrinter.modifier *= 500;
            glob.buildings.scoreMachine.modifier *= 500;
        },
        offEffect: () => {
            glob.buildings.scoreWell.modifier /= 500;
            glob.buildings.scorePrinter.modifier /= 500;
            glob.buildings.scoreMachine.modifier /= 500;
        }
    }
];