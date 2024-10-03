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
        button.id = `category-${item.category_id}`
        button.classList.add('btn', 'categoryBtn')
        button.innerText = item.category
        button.onclick = () => handleBtnData(item.category_id)
        allCategories.append(button)
    });
}

const handleBtnData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await res.json()
    displayVideos(data.category)

    const categoryBtn = document.getElementsByClassName('categoryBtn')
    for (const btn of categoryBtn) {
        btn.classList.remove('btn-error', 'text-white')
    }
    const activeBtn = document.getElementById(`category-${id}`)
    activeBtn.classList.add('btn-error', 'text-white')
}

// load all vedios
const loadVideos = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await res.json()
    displayVideos(data.videos)
}
// let video ={
//     "category_id": "1003",
//     "video_id": "aaaf",
//     "thumbnail": "https://i.ibb.co/5LRQkKF/stick-and-stones.jpg",
//     "title": "Sticks & Stones",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/rdTZrCM/dev.jpg",
//             "profile_name": "Dave Chappelle",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "113K",
//         "posted_date": ""
//     },
//     "description": "Dave Chappelle's 'Sticks & Stones' has garnered 113K views and remains a controversial yet highly engaging piece of stand-up comedy. Known for his fearless approach, Dave dives into a wide range of topics, delivering his unique perspective with wit and sharp humor. As a verified artist, Dave's comedy is raw, honest, and unapologetically funny."
// }
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
    else {
        videoSection.classList.add('grid')
    }
    videos.forEach(video => {
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
        <button onclick="handleModal('${video?.video_id}')" class="btn btn-sm">Details</button>
        `
        videoSection.append(card)
    });
}
loadCategories()
loadVideos()

const inputFiled = document.getElementById('searchFiled')
inputFiled.addEventListener('keyup', (e) => {
    const searchImplement = async () => {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${e.target.value}`)
        const data = await res.json()
        displayVideos(data.videos)
    }
    searchImplement()
})

const handleModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
    const modalContent = document.getElementById('modal-content')
    try {
        const res = await fetch(url)
        const data = await res.json()
        const modalData = data.video;
        modalContent.innerHTML =`
         <div class="w-full h-[300px]">
                <img class="w-full h-full object-cover rounded-lg" src=${modalData.thumbnail} alt="">
            </div>
            <h1 class="text-2xl font-bold">Title</h1>
            <p>${modalData.description}</p>        
        `
    }
    catch {
        console.error(error)
    }
     document.getElementById('modalOpen').showModal();
}