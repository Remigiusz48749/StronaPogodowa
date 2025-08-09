# Strona Pogodowa - Aplikacja pogodowa w React
Projekt strony internetowej umożliwiającej wyświetlanie informacji pogodowych dla wybranych miast, z dodatkowymi funkcjonalnościami logowania, dodawania do ulubionych i komentowania.

## 🛠 Technologie
- React

- React Redux + Redux Toolkit

- React Router DOM

- Axios

- ESLint + Prettier

- Firebase (auth, firestore)

- Firebase Tools

## 🌦 Funkcje aplikacji
- Logowanie i rejestracja przy użyciu konta Google lub e-maila

- Wylogowywanie się

- Wyświetlanie aktualnej pogody przy pomocy API OpenWeather

- Wyszukiwanie pogody w dowolnym mieście

- Prognoza pogody na najbliższe 5 dni

- Dodawanie miast do ulubionych

- Możliwość zostawiania komentarzy

## 🔧 Konfiguracja
### 1. Klucz API OpenWeather
W pliku src/components/CityWeather.jsx, w linii 10, ustaw swój klucz API:

```js
const APIKEY = "TWOJ_KLUCZ_API";
```
### 2. Konfiguracja Firebase
W pliku src/config/firebase.js umieść dane konfiguracyjne z własnego projektu Firebase:

```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TWOJ_API_KEY",
  authDomain: "TWOJ_AUTH_DOMAIN",
  projectId: "TWOJ_PROJECT_ID",
  storageBucket: "TWOJ_STORAGE_BUCKET",
  messagingSenderId: "TWOJ_SENDER_ID",
  appId: "TWOJ_APP_ID",
  measurementId: "TWOJ_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider(); 
export const db = getFirestore(app);
```
W Firebase Sing-in-method ustawić na metody: __email i Google__

Dodatkowo w Firebase należy ustawić odpowiednie __Rules__ w Cloud Firestore:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /comments/{commentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```
## 🚀 Uruchomienie projektu
Ustaw wersję Node.js przy użyciu nvm:

```bash
nvm use
```
Jeśli pojawi się błąd, zainstaluj odpowiednią wersję:

```bash
nvm install 20.18.0
nvm use
```
Zainstaluj zależności:

```bash
npm install
npm install axios react-router-dom redux react-redux redux-persist firebase
npm install -g firebase-tools
```
Uruchom projekt:

```bash
npm start
```
## 🖼️ Widoki
- Login: http://localhost:3000/
<img width="1875" height="912" alt="image" src="https://github.com/user-attachments/assets/50665b35-8cb8-4ea6-8d79-2ee1f5b59966" />

- Home: http://localhost:3000/Home
<img width="1884" height="912" alt="image" src="https://github.com/user-attachments/assets/6331bc09-ea4a-4a62-8ee2-808cad9a7900" />
<img width="1822" height="891" alt="image" src="https://github.com/user-attachments/assets/c9c22d12-9f34-41c7-bf0d-de8e598beb86" />

- Favorites: http://localhost:3000/Favorites
<img width="1882" height="882" alt="image" src="https://github.com/user-attachments/assets/ca384757-f4cf-4a57-8108-0f1fa126dd1d" />

- Comments: http://localhost:3000/Comments
<img width="1867" height="900" alt="image" src="https://github.com/user-attachments/assets/2de5ae4d-cbf6-4161-a209-1aad5cbead06" />

## 🔗 Link do repozytorium
https://github.com/Remigiusz48749/StronaPogodowa
