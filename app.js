// Arabic language Hadees API
// let url="https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json";

const url1 = `https://random-hadith-generator.vercel.app/bukhari/`;
const url2 = "https://random-hadith-generator.vercel.app/muslim/";
const url3 = "https://random-hadith-generator.vercel.app/abudawud/";
const url4 = "https://random-hadith-generator.vercel.app/ibnmajah/";
const url5 = "https://random-hadith-generator.vercel.app/tirmidhi/";

let selectOption = document.querySelector("#select");
let button = document.querySelector("button");
let p = document.querySelector("p");
let reference = document.querySelector("h3");
let narrator = document.querySelector("h2");
let search = document.querySelector("#search");
let btnSearch = document.querySelector(".btn");



button.addEventListener("click", function () {
  let value = selectOption.value;
  if (value == "Bukhari") {
    genrateHadeesData(url1);
  } else if (value == "Muslim") {
    genrateHadeesData(url2);
  } else if (value == "Abudawood") {
    genrateHadeesData(url3);
  } else if (value == "Ibnimajah") {
    genrateHadeesData(url4);
  } else if (value == "Trimidhi") {
    genrateHadeesData(url5);
  }

});

async function genrateHadeesData(allUrl) {
  try{
    let hadeesData = await axios.get(allUrl);
    reference.innerText = `(${hadeesData.data.data.refno})`;
    narrator.innerText = hadeesData.data.data.header;
    function cleanText(text) {
      return text.replace(/[\u200B-\u200D\uFEFF]/g, '')
                 .replace(/\u00A0/g, ' ')
                 .replace(/\r?\n|\r/g, ' '); 
    }
    
    const hadeesText =hadeesData.data.data.hadith_english;
    const cleanedText = cleanText(hadeesText);
    p.innerText=cleanedText;
    scrollUp();

  }catch(e){
    alert("No Hadees Found",e)
    console.log(e);
  }

}

window.addEventListener("load", function () {
  genrateHadeesData(url1);
});

btnSearch.addEventListener("click", function () {
  getHadeesBook();

});

search.addEventListener("keypress",function(e){
  if(e.key=="Enter"){
    getHadeesBook()
  }
})

function getHadeesBook(){
  if(search.value==""){
    alert("Please Enter Hadees No")
  }else{
  let hadeesValue = search.value;
  let key = `${hadeesValue}`;
  let value = selectOption.value;
  if (value == "Bukhari") {
    let newUrl = url1 + key;
    genrateHadeesData(newUrl);
   
  } else if (value == "Muslim") {
    let newUrl = url2 + key;
    genrateHadeesData(newUrl);
  } else if (value == "Abudawood") {
    let newUrl = url3 + key;
    genrateHadeesData(newUrl);
  } else if (value == "Ibnimajah") {
    let newUrl = url4 + key;
    genrateHadeesData(newUrl);
  } else if (value == "Trimidhi") {
    let newUrl = url5 + key;
    genrateHadeesData(newUrl);
  }
  search.value=""
  scrollUp();
}

}


function scrollUp(){
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
}