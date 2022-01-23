import robotjs from 'robotjs'
import { ChildProcess, exec } from 'child_process'

const JOIN_BUTTON_COLOR = "293370"
const ACTIVE_MIC_COLOR = "494b83"

const teamsTabsCoord = { x: 30, y: 185 }
const channelCoord = { x: 250, y: 175 }
const joinButtonCoord = { x: 750, y: 840 }
const muteButtonCoord = { x: 1080, y: 460 }
const confirmJoinButtonCoord = { x: 1370, y: 680 }

async function main() {

    try {
        await openTeams();

        await delay(1000);

        await openTeams();

        robotjs.moveMouse(teamsTabsCoord.x, teamsTabsCoord.y)
        robotjs.mouseClick()

        robotjs.moveMouse(channelCoord.x, channelCoord.y)
        robotjs.mouseClick()

        await delay(3000);

        let buttonColor = "";



        while (true) {
            buttonColor = robotjs.getPixelColor(joinButtonCoord.x, joinButtonCoord.y)
            robotjs.moveMouse(joinButtonCoord.x, joinButtonCoord.y)
            if (buttonColor == JOIN_BUTTON_COLOR)
                break;

            joinButtonCoord.y -= 20
            await delay(1000)
        }


        robotjs.moveMouse(joinButtonCoord.x, joinButtonCoord.y)
        robotjs.mouseClick()

        await delay(3000);

        robotjs.moveMouse(muteButtonCoord.x, muteButtonCoord.y)
        const color = robotjs.getPixelColor(muteButtonCoord.x, muteButtonCoord.y)

        if (color == ACTIVE_MIC_COLOR)
            robotjs.mouseClick()

        await delay(1000);

        robotjs.moveMouse(confirmJoinButtonCoord.x, confirmJoinButtonCoord.y)
        robotjs.mouseClick()



    } catch (error) {
        console.error(error);
    }

}

function delay(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })

}

function openTeams(): Promise<ChildProcess> {

    return new Promise((resolve, reject) => {

        let process = exec('start /max %userprofile%/AppData/Local/Microsoft/Teams/Update.exe --processStart "Teams.exe"', (error) => {
            if (error) {
                reject();
                return;
            }

            resolve(process);
        })

    });
}

main();