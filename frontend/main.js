let login_btn = document.getElementById('login-btn')
let logout_btn = document.getElementById('logout-btn')

let token = localStorage.getItem('token')

if (token) {
    login_btn.remove()
} else {
    logout_btn.remove()
}

logout_btn.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location = 'file:///C:/Users/bayst/coding/dev-portfolio/portofolio-dev-django/frontend/login.html'
})


let project_url = 'http://127.0.0.1:8000/api/projects/'

let get_projects = () => {

    fetch(project_url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        build_projects(data)
    })

}

let build_projects = (projects) => {
    let projects_wrapper = document.getElementById('projects--wrapper')
    projects_wrapper.innerHTML = ''

    for (let i = 0; projects.length > i; i++){
        let project = projects[i]
        
        let project_card = `
            <div class="project--card">
                <img src="http://127.0.0.1:8000${ project.featured_image }">

                <div>
                    <div class="card--header">
                        <h3>${ project.title }</h3>
                        <strong class="vote--option" data-vote="up" data-project="${ project.id }">&#43;</strong>
                        <strong class="vote--option" data-vote="down" data-project="${ project.id }">&#8722;</strong>
                    </div>
                    <i>${ project.vote_ratio }% Positive feedback</i>
                    <p>${ project.description.substring(0, 150) }</p>
                </div>

            </div>
        `
        projects_wrapper.innerHTML += project_card
    }

    add_vote_events()

}

let add_vote_events = ()=> {
    let vote_btns = document.getElementsByClassName('vote--option')
    
    for (let i = 0; vote_btns.length > i; i++) {

        vote_btns[i].addEventListener('click', (e) => {
            let token = localStorage.getItem('token')
            console.log('TOKEN:', token)

            let vote = e.target.dataset.vote
            let project = e.target.dataset.project

            fetch(`http://127.0.0.1:8000/api/projects/${project}/vote/`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({'value':vote})
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
                get_projects()
            })

        })

    }
}

get_projects()