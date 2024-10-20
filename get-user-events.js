async function getUserEvents(username) {
    const res = await fetch(`https://api.github.com/users/${username}/events`)
    if (!res.ok){
        if (res.status == 404){
            console.error('Error trying to get the user, not found.')
        }
        else {
            console.error('Error during the request.')
        }
        exit(1)
    }
    const events = await res.json()
    return events
}
export default getUserEvents