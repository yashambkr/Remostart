var x = "";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  child,
  get,
  onValue,
  push,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import {
  getAuth,
  signOut,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC8G9Wf5tJE-GAiI5dLsmn4lCDGmKjxey8",
  authDomain: "remostart-daf09.firebaseapp.com",
  projectId: "remostart-daf09",
  storageBucket: "remostart-daf09.appspot.com",
  messagingSenderId: "1072762916132",
  appId: "1:1072762916132:web:99d06258e6ea16ba4437b1",
});
// references
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const dbRef = ref(getDatabase());

// for getting data of user
auth.onAuthStateChanged((user) => {
  if (user) {
    get(child(dbRef, "Company/" + user.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        const CompanyName = snapshot.val().CompanyName;
        console.log(CompanyName);

        const tempRef = ref(database, "Company/" + user.uid + "/CreatedJobs/");
        onValue(
          tempRef,
          (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val().JobID;
              console.log("JobId= " + childData);

              const jobRef = ref(database, "Jobs/" + childData + "/");

              onValue(jobRef, (snapshot) => {
                const data = snapshot.val().Jobtitle;
                const cardList = document.getElementsByClassName("test")[0];

                console.log(data);
                const newGroup = document.createElement("ul");
                newGroup.classList.add("card");
                const lcard = document.createElement("li");
                newGroup.appendChild(lcard);
                const card = document.createElement("div");
                card.classList.add("card");
                newGroup.appendChild(card);
                const ncard = document.createElement("div");
                ncard.classList.add("container");
                newGroup.appendChild(ncard);
                card.classList.add("card");
                card.classList.add("w-100");
                card.classList.add("h-150");

                const CompanyName = document.createElement("h2");
                CompanyName.innerText =
                  "Company Name : " + snapshot.val().CompanyName;
                ncard.appendChild(CompanyName);

                const CompanyWebsite = document.createElement("h3");
                CompanyWebsite.innerText =
                  "Company Website : " + snapshot.val().CompanyWebsite;
                CompanyName.appendChild(CompanyWebsite);

                const CompanyDescripition = document.createElement("p");
                CompanyDescripition.innerText =
                  "CompanyDescripition : " + snapshot.val().CompanyDescripition;
                CompanyWebsite.appendChild(CompanyDescripition);

                const Job_Title = document.createElement("h2");
                Job_Title.innerText = "Job Title : " + snapshot.val().Jobtitle;
                CompanyDescripition.appendChild(Job_Title);

                const Job_location = document.createElement("p");
                Job_location.innerText =
                  "Job Location : " + snapshot.val().Joblocation;
                Job_Title.appendChild(Job_location);

                const Job_Type = document.createElement("h3");
                Job_Type.innerText = "Job Type : " + snapshot.val().JobType;
                Job_location.appendChild(Job_Type);

                const job_Description = document.createElement("p");
                job_Description.innerText =
                  "Description : " + snapshot.val().Description;
                Job_Type.appendChild(job_Description);

                const Qualification = document.createElement("p");
                Qualification.innerText =
                  "Qualification : " + snapshot.val().Qualification;
                job_Description.appendChild(Qualification);

                cardList.appendChild(newGroup);
              });
            });
          },
          {
            onlyOnce: true,
          }
        );
      } else {
        console.log("Not possible");
      }
    });
  }
});

var createJobBtn = document
  .getElementById("create-job-btn")
  .addEventListener("click", (e) => {
    window.location = "../company/create_job.html";
  });

// btn.addEventListener('click', e => {
//     const storage = getStorage();
//     const file = document.querySelector('input').files[0];
//     const filename = file.name;
//     const ImagesRef = ref(storage, ('Resume/Web/' + { filename }));

//     // const final = firebaseApp.storage.child(`Resume/Web/${file}`);

//     const uploadTask = uploadBytesResumable(ImagesRef, file);
//     uploadTask.on('state_changed',
//         (snapshot) => {

//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             document.getElementById("progressbar").style.width = progress + "%";
//             document.getElementById("progressbar").innerHTML = progress + "%";
//             console.log('Upload is ' + progress + '% done');
//         },
//         (error) => {
//             // Handle unsuccessful uploads
//         },
//         () => {

//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 console.log('File available at', downloadURL);
//             });
//         }
//     );

// });
