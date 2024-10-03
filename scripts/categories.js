// load fetch All categories 
const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        const data = await res.json()
        displayData(data.categories)
    }
    catch {
        console.error(error);
    }
}

// display categories in html 
const displayData = (datas) => {
    const allCategories = document.getElementById('allCategories')
    datas.forEach((item) => {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.innerText = item.category
        allCategories.append(button)
    });
}

// load all vedios
const loadVideos = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await res.json()
    displayVideos(data.videos)
}
const video = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
const displayVideos = (videos) => {
    const videoSection = document.getElementById('videoSection')
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
                <p>${video.authors[0].profile_name} <span>${video.authors[0].verified === true ? 'yes' : 'no'}</span></p>
                <p>${video.others.views}</p>
                
            </div>
        </div>
        
        `
        videoSection.append(card)
    });
}
loadCategories()
loadVideos()


