import {argv, exit} from 'node:process'
import { writeFileSync } from 'node:fs'

import getUserEvents from './get-user-events.js'
async function main(){
    const username = argv.slice(' ')[2]
    console.log('Fetching info from the user ' + username)
    const events = await getUserEvents(username)
    printResults(events)
}

function printResults(events) {
    events.forEach(event => {
        let repoName = event.repo.name
        switch (event.type){
            case 'WatchEvent': {
                console.log(`Starred ${repoName}`)
                break
            }
            case 'IssuesEvent': {
                console.log(`Opened a new issue in ${repoName}`)
                break
            }    
            case 'PushEvent': {
                let commitCount = event.payload.commits.length
                if (commitCount > 1){
                    console.log(`Pushed ${commitCount} commits to ${repoName}`)
                }
                else {
                    console.log(`Pushed ${commitCount} commit to ${repoName}`)
                }
                break
            }
        }
    })    
}
main()