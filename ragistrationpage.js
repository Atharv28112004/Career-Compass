import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCSmKvaiGOCjldpzkMhf8y1N3XxT_pXEm8",
  authDomain: "careercompass-221a1.firebaseapp.com",
  projectId: "careercompass-221a1",
  storageBucket: "careercompass-221a1.firebasestorage.app",
  messagingSenderId: "889526751109",
  appId: "1:889526751109:web:de238b13d3295e7b0fbeec",
  measurementId: "G-1BW6E55NQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Toggle code
const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Register form
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("registerUsername").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      uid: user.uid,
      createdAt: new Date().toISOString()
    });

    alert("Registration successful!");
    registerForm.reset();
    window.location.href = "https://atharv28112004.github.io/Career-Compass/";
  } catch (error) {
    alert(error.message);
    console.error("Registration Error:", error);
  }
});

// Login form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    loginForm.reset();
    window.location.href = "https://atharv28112004.github.io/Career-Compass/";
  } catch (error) {
    alert(error.message);
    console.error("Login Error:", error);
  }
});