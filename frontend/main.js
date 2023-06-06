

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
    let projects_wrapper = document.getElementById('projects-wrapper')

    for (let i = 0; projects.length > i; i++){
        let project = projects[i]
        
        let project_card = `
            <div>
                <p>${project.title}</p>
            </div>
        `
        projects_wrapper.innerHTML += project_card
    }
}

get_projects()