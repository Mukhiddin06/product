let elUsersList = document.querySelector(".users-list");

function getRequest(){
    axios.get("https://dummyjson.com/products").then(res => {
        res.data.products.map(item => {
            let elItem = document.createElement("li");
            elItem.className = "w-[400px] p-5 rounded-lg bg-slate-200"
            elItem.innerHTML = `
                <img class="object-contain bg-white rounded-lg p-2 mb-5 h-[200px]" src="${item.images[0]}" alt="Product Img" width="100%" height="70">
                <h2 class="font-bold mb-5 text-[20px]">${item.title}</h2>
                <p class="line-clamp-3">${item.description}</p>
                <button class="bg-blue-600 text-white py-2 rounded-lg mt-2 font-semibold w-full" onclick="handleSendMassage(${item.id})">Send Massage</button>
            `;
            elUsersList.appendChild(elItem);
        });
    })
}
getRequest();




const TOKEN = "7391240661:AAGIkbxFfV4hPguIR2uDc4IvyQBjTnzix6I"
const CHAT_ID = "-1002157317600"
const HTTP = `https://api.telegram.org/bot${TOKEN}/sendPhoto`

function handleSendMassage(id){
    axios.get(`https://dummyjson.com/products/${id}`).then(res => {
        let massage = `<b>Products info</b>\n`
        massage += `<b>Name: ${res.data.title}</b>\n`
        massage += `<b>Description: ${res.data.description}</b>\n`

        axios.post(HTTP, {
            chat_id: CHAT_ID,
            photo: res.data.images[0],
            parse_mode: "html",
            caption: massage
        })
    })
}
