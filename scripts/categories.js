// load fetch All categories 
const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        const data = await res.json()
        displayCategorys(data.categories)
    }
    catch {
        console.error(error);
    }
}

// display categories in html 
const displayCategorys = (datas) => {
    const allCategories = document.getElementById('allCategories')
    datas.forEach((item) => {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.onclick = () => handleBtnData(item.category_id)
        button.innerText = item.category
        allCategories.append(button)
    });
}

const handleBtnData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await res.json()
    displayVideos(data.category)
}

// load all vedios
const loadVideos = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await res.json()
    displayVideos(data.videos)
}
const displayVideos = (videos) => {
    const videoSection = document.getElementById('videoSection')
    videoSection.innerHTML = ''
    if (videos.length == 0) {
        videoSection.classList.remove('grid')
        videoSection.innerHTML = `<div class="w-full pt-20 flex items-center justify-center flex-col">
            <img src="assest/Icon.png" alt="">
            <p class="text-gray-600 font-bold text-3xl">Oops!! Sorry, There is no content here</p>
        </div>
        `
    }
    else{
        videoSection.classList.add('grid')
    }
    videos.forEach(video => {
        console.log(video)
        const card = document.createElement('div')
        card.classList.add('card', 'card-compact', 'shadow-xl')
        card.innerHTML = `
        <figure>
            <div class="xl:h-[250px] md:h-[200px] h-[300px] w-full">
              <img class="h-full w-full object-cover" src=${video.thumbnail} />
            </div>
        </figure>
        <div class="card-body flex flex-row">
            <div>
                 <img class="h-10 w-10 object-cover rounded-full" src=${video.authors[0].profile_picture} />
            </div>
            <div>
                <h2 class="card-title font-bold">${video.title}</h2>
                <p>${video.authors[0].profile_name} <span>${video.authors[0].verified === true ? '<i class="fa-solid text-blue-500 fa-certificate"></i>' : ''}</span></p>
                <p>${video.others.views} views</p>
                
            </div>
        </div>
        
        `
        videoSection.append(card)
    });
}
loadCategories()
loadVideos()


