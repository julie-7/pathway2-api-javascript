const endpoint = "https://dfypyzoplyzfywjnitcn.supabase.co/rest/v1/movierental"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmeXB5em9wbHl6Znl3am5pdGNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNDczMTksImV4cCI6MjA0MzkyMzMxOX0.vANaYlT4x8hX9wjS_Yy2v4sOH-3OTJa577cAj_MAdXQ"



async function getmovies() {

    let response = await fetch(endpoint, {
        method: `GET`,
        headers: {
            "apikey": token,
            "Authorization": token,
            "Content-Type": `application/json`
        },

    })

    let data = await response.json()
    rendermovies(data)
}

getmovies()

function rendermovies(data) {
    let tablelayout = `<tr>
                <th>title</th>
                <th>genre</th>
                <th>releasedate</th>
                <th>available</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>`
    for (let i = 0; i < data.length; i++) {
        tablelayout += `<tr>
                        <td>${data[i].title}</td>
                        <td>${data[i].genre}</td>
                        <td>${data[i].releasedate}</td>
                        <td>${data[i].available}</td>
                        <td> <button onclick="showmodal(${data[i].id})
                    "class="btn btn-warning">edit</button> </td>
                    <td> 
                    <button onclick=deletemovie(${data[i].id}) class="btn btn-danger">Delete</button></td>

            </tr>`
                    
    }

    reportmovies.innerHTML = tablelayout
}

async function postmovie() {
    event.preventDefault()
    console.log("i have rented a movie")
    let title = inputtitle.value
    let genre = inputgenre.value
    let releasedate = inputreleasedate.value
    let available = inputavailable.value


    let jsonData = {
        title,
        genre,
        releasedate,
        available
    }



    let response = await fetch(endpoint, {
        method: `POST`,
        headers: {
            "apikey": token,
            "Authorization": token,
            "Content-Type": `application/json`
        },


    })


    if (response.ok) {
        console.log("object created")
        getmovies()
    } else {
        console.log("object was not created")
    }

}

async function showmodal(id) {
    let url = `${endpoint}?id=eq.${id}`


    console.log(url)
    let response = await fetch(url, {
        method: `GET`,
        headers: {
            "apikey": token,
            "Authorization": token
        },
    })

    if (response.ok) {

        let data = await response.json();
        inputtitle.value = data[0].title
        inputgenre.value = data[0].genre
        inputreleasedate = data[0].releasedate
        inputavailable = data[0].available

        
    } else {
        console.log("Movie could not be fetched")
        let data = await response.json();
        console.log(data)
    }
}

async function patchcontact(id) {

    let title = inputtitle2.value
    let genre = inputgenre2.value
    let releasedate = inputreleasedate2.value
    let available = inputavailable2.value

    let url2 = `${endpoint}?id=eq${id}`

    let jsonbody = {
        title,
        genre,
        releasedate,
        available
    }


    let response2 = await fetch(url, {
        method: `PATCH`,
        headers: {
            "apikey": token,
            "Authorization": token,
            "Content-Type": `application/json`
        },
        body: json.stringify()
    })

    if (response.ok) {
        console.log("object has been updated")
    } else {
        console.log("object hasnt been updated")
        let responsebody = await response.json()
        console.log(responsebody)
    }
}

async function deletemovie(id) {
    let url = `${endpoint}?id=eq.${id}`

    let response = await fetch(url, {
        method: `DELETE`,
        headers: {
            "apikey": token,
            "Authorization": token

        }
    })

    if (response.ok){
        console.log("Object Deleted")
        getmovies()
    }else{
        console.log("Object was not deleted")
    }
}
