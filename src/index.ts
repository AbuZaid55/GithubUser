const input = document.querySelector('input') as HTMLInputElement
const main = document.querySelector('#main') as HTMLElement
interface userData {
    id:number;
    login:string;
    avatar_url:string;
    location:string;
    url:string;
}
const fetchData = async<T>(url:string):Promise<T> =>{
    const resp:Response = await fetch(url)
    if(!resp.ok){
        throw new Error('Something went wrong!')
    }
    const data = await resp.json()
    return data
}
const showResult=(userData:userData)=>{
    const {avatar_url,login,url,location}=userData
    main.insertAdjacentHTML('beforeend',`<div class="card">
    <img src=${avatar_url} alt=${login}>
    <p>${login}</p>
    <hr/>
    <div>
        <img src=${avatar_url} alt=${login}>
        <a href=${url}>${location}</a>
    </div>
</div>`)
}
fetchData<userData[]>('https://api.github.com/users').then((data:userData[])=>{
    for(const singleUser of data){
        showResult(singleUser)
    }
})

async function search (e:any){
    main.innerHTML=''
    const allData = await fetchData<userData[]>('https://api.github.com/users')
    const filterData = allData.filter((currData)=> currData.login.toLowerCase().includes((e.target.value).toLowerCase()))
    for(const singleUser of filterData){
        showResult(singleUser)
    }
}
input.addEventListener('input',search)