let  on_off=0;
let cam=1;
const screenElement = document.querySelector(".screen");
const App = document.querySelector(".app");
const wiki = document.querySelector(".wiki-iframe");
const calendar = document.querySelector(".calendar-iframe");
const camera = document.querySelector(".cam_screen");
const canvasElement = document.getElementById("canvasElement");
const photoFrame = document.querySelector(".photoFrame");
const videoElement = document.getElementById("videoElement");
const text_editor = document.querySelector(".text_editor");
const editor = document.getElementById('editor');
const saveButton = document.getElementById('saveButton');
const clock_widget = document.querySelector(".clock_widget");
const photoGallery=document.querySelector(".photoGallery");
const setting=document.querySelector(".setting_screen");

// CHANGE EVENT ADD KIYA WALLPAPER CHANGE KILIYE------------------------------------------>
document.getElementById('imageInput').addEventListener('change', handleFileInput);

let photoUrls = [];
let stream;
let wallpaper="You.png";


// SCREEN ON_OFF KA CODE HAI----------------------->
function power_off_on() {
    on_off=on_off+1;
    console.log("on_of===>>",on_off);
    if (on_off %2 ==0) 
    {
        screenElement.style.backgroundColor = "#111";
        screenElement.style.backgroundImage = `url('${''}')`;
        App.style.display= "none";
        clock_widget.style.display= "none";
        wiki.style.display="none";
        calendar.style.display="none";
        camera.style.display="none";
        photoFrame.style.display="none";
        text_editor.style.display="none";
        photoGallery.style.display="none";
    } else
    {
        setTimeout(function () {
        screenElement.style.backgroundColor = "#111";
        }, 100);
        setTimeout(function () {
        screenElement.style.backgroundColor = "#222";
        }, 150);
        setTimeout(function () {
        screenElement.style.backgroundColor = "#333";
        }, 200);
        setTimeout(function () {
        screenElement.style.backgroundColor = "#444";
        }, 250);
        setTimeout(function () {
        screenElement.style.backgroundColor = "#fff";
        }, 300);
        setTimeout(function () {
            if (localStorage.getItem('wallpaperImage')!==null) {
        wallpaper=localStorage.getItem('wallpaperImage');
    
}
        screenElement.style.backgroundImage = `url('${wallpaper}')`;
        screenElement.style.backgroundRepeat = "no-repeat";
        screenElement.style.backgroundPosition = "center";
        screenElement.style.backgroundSize="200% 100%";
        App.style.display= "block";
        clock_widget.style.display= "block";
        }, 1000);
    }
};
//WIKIPEDIA KA CODE HAI------------------------------->
function openWiki() {
    wiki.style.display="block";
    App.style.display="none";
    clock_widget.style.display= "none";
};
//CALENDER KA CODE HAI-------------------------------->
function openCalender() {
    calendar.style.display="block";
    App.style.display="none";
    clock_widget.style.display= "none";
};
//Settings KA CODE HAI-------------------------------->
function openSetting() {
    setting.style.display="block";
    App.style.display="none";
    clock_widget.style.display= "none";
};
//NOTEPAD OPEN KARNE KA CODE--------------------------->
function openNote() {
    text_editor.style.display="block";
    App.style.display="none";
    clock_widget.style.display= "none";
    function saveText() {
    const text = editor.value;
    localStorage.setItem('notepad_text', text);
    alert('Text saved successfully!');
    }
    saveButton.addEventListener('click', saveText);
};
function loadText() {
    const savedText = localStorage.getItem('notepad_text');
    if (savedText) {
        editor.value = savedText;
    }
    }
function openGallery() {
    photoGallery.style.display="block";
    App.style.display="none";
    clock_widget.style.display= "none";
    displayGallery();
};


// BACK ARROW BUTTON KA CODE HAI--------------->
function goBack(){
    if (cam==0) {
        console.log("cam===>>",cam);
        camera.style.display="block";
        photoFrame.style.display="none";
        cam=1;
    } else {
        App.style.display="block";
        clock_widget.style.display= "block";
        wiki.style.display="none";
        camera.style.display="none";
        calendar.style.display="none";
        text_editor.style.display="none";
        photoGallery.style.display="none";
        setting.style.display="none";
        if (localStorage.getItem('wallpaperImage')!==null) {
        wallpaper=localStorage.getItem('wallpaperImage');
        screenElement.style.backgroundImage = `url('${wallpaper}')`;
}
    }
}
// CAMERA RELATED CODE-------------------------->
async function openCamera() {
    try {
        camera.style.display='block';
        clock_widget.style.display= "none";
        stream = await navigator.mediaDevices.getUserMedia({video:true});
        videoElement.srcObject = stream;
    } catch (error) {
        console.error("Error accessing the camera: ", error);
    }
}
function clickPhoto() {
    cam=0;
    photoFrame.style.display="block";
    camera.style.display='none';
    const context = canvasElement.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    const photoURL = canvasElement.toDataURL();
    console.log(photoURL);
    photoUrls.push(photoURL);
    const photoUrlsString = JSON.stringify(photoUrls);
    localStorage.setItem('photoUrls', photoUrlsString);
    alert("Photo Saved Successfull to Gallery");
}
// CLOCK WIDGET KA CODE----------------------->
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(1, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("clock").textContent = timeString;
}

//PHOTO KE URL ARRAY KO LOCAL STORGE SE LENA----------------------->
function getPhotoUrlsFromLocal() {
    const photoUrlsString = localStorage.getItem('photoUrls');
    return JSON.parse(photoUrlsString) || []; // If local storage is empty, return an empty array
}

//PHOTO KE URL KO GALLERY MAI ADD KARNE KILIYE----------------------->
function displayGallery() {
    const gallery = document.getElementById('gallery_photos');
    gallery.innerHTML = '';

    photoUrls = getPhotoUrlsFromLocal();

    for (const index in photoUrls) 
    {
        const photoURL = photoUrls[index];
        const imgElement = document.createElement('img');
        const lineBreak = document.createElement('br');
        imgElement.src = photoURL;
        imgElement.style.maxWidth = "200px"; 
        imgElement.style.marginLeft = "20%"; 
        gallery.appendChild(lineBreak);
        gallery.appendChild(imgElement);
    }

}

function handleFileInput() {
  const fileInput = document.getElementById('imageInput');
  
  // Check if a file is selected
  if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      const reader = new FileReader();
      
      // Read the selected file as a data URL
      reader.onload = function (e) {
          const imageDataUrl = e.target.result;
          
          // Store the data URL in local storage
          localStorage.setItem('wallpaperImage', imageDataUrl);
          alert('Wallpaper image updated ');
      };
      
      reader.readAsDataURL(selectedFile);
  }
}

setInterval(updateClock, 1000);
loadText();
displayGallery();